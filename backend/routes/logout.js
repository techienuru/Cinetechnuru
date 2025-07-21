import express from "express";
import { handleLogout } from "../controllers/logoutControllers.js";

const logoutRouter = express.Router();

logoutRouter.get("/", handleLogout);

export default logoutRouter;
