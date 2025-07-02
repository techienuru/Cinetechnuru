import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { handleNewUser } from "../controllers/registerControllers.js";

const registerRouter = express.Router();

registerRouter.post("/", handleNewUser);

export default registerRouter;
