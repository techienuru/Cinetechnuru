import express from "express";
import { handleLogin } from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/", handleLogin);

export default authRouter;
