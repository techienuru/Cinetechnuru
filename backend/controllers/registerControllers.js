import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

export const handleNewUser = async (req, res, next) => {
  if (
    !req?.body?.fullname ||
    !req?.body?.username ||
    !req?.body?.email ||
    !req?.body?.password ||
    !req?.body?.cPassword
  )
    return res.status(400).json({
      error: "fullname,username, email, password, and cPassword are required.",
    });

  const { fullname, username, email, password, cPassword } = req?.body;

  try {
    if (password !== cPassword)
      return res.status(400).json({ error: "Password Mismatch!" });

    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate)
      return res.status(400).json({ error: "User already exist." });

    const hashPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      fullname,
      username,
      email,
      password: hashPassword,
    });

    res
      .status(201)
      .json({ message: `User ${username} created sucessfully.`, result });
  } catch (err) {
    next(err);
  }
};
