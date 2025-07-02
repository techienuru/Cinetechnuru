import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

export const handleNewUser = async (req, res, next) => {
  if (!req?.body?.username || !req?.body?.email || !req?.body?.password)
    return res
      .status(400)
      .json({ error: "Username, email, and password are required." });

  const { username, email, password } = req?.body;

  try {
    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate)
      return res.status(400).json({ error: "User already exist." });

    const hashPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
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
