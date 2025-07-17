import bcrypt from "bcrypt";
import User from "../models/User.js";

export const getProfile = async (req, res, next) => {
  try {
    const { email } = req;

    let foundUser = await User.findOne({ email }).exec();
    foundUser.refreshToken = null;

    res.json({ message: "success", foundUser });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  if (
    !req?.body?.fullname ||
    !req?.body?.username ||
    !req?.body?.oldPassword ||
    !req?.body?.newPassword
  ) {
    return res.status(400).json({
      error: "fullname, username, oldPassword, and newPassword required",
    });
  }

  const { fullname, username, oldPassword, newPassword } = req.body;

  const { email } = req;

  let foundUser = await User.findOne({ email }).exec();

  const oldPasswordMatch = await bcrypt.compare(
    oldPassword,
    foundUser.password
  );

  if (!oldPasswordMatch)
    return res.status(401).json({ error: "Previous Password is not correct" });

  const hashPassword = await bcrypt.hash(newPassword, 10);

  foundUser.fullname = fullname;
  foundUser.username = username;
  foundUser.password = hashPassword;

  const result = await foundUser.save();
  res.json({ message: "success", result });
};
