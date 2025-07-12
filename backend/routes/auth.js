import express from "express";
import { handleLogin } from "../controllers/authControllers.js";

const authRouter = express.Router();

// All Routes preceeded with "/auth"
authRouter.post("/", handleLogin);

export default authRouter;
