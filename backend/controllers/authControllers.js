import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from "../config/secretKeys.js";

export const handleLogin = async (req, res, next) => {
  if (!req?.body?.email || !req?.body?.password)
    return res.status(400).json({ error: "email and password are required." });

  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser)
      return res.status(401).json({ error: "User does not exist!" });

    const pwdCorrect = await bcrypt.compare(password, foundUser.password);

    if (!pwdCorrect)
      return res.status(401).json({ error: "incorrect password" });

    const accessToken = jwt.sign({ email }, ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });

    const refreshToken = jwt.sign({ email }, REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    }); // In production / when deploying, set "secure:true" && sameSite:"None"

    res.json({ message: "Success", accessToken });
  } catch (err) {
    next(err);
  }
};
