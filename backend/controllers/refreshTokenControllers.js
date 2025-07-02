import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from "../config/secretKeys.js";

const refreshJWT = async (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies?.jwt)
    return res.status(401).json({ error: "Please login first." });
  const refreshToken = cookies.jwt;

  try {
    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser) return res.status(403).json({ error: "Invalid token" });

    jwt.verify(foundUser.refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err || foundUser.email !== decoded.email)
        return res
          .status(403)
          .json({ error: "Refresh token is invalid or has expired." });
    });

    const accessToken = jwt.sign(
      { email: foundUser.email },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );

    res.json({ message: "success", accessToken });
  } catch (err) {
    next(err);
  }
};

export default refreshJWT;
