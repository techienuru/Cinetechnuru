import express from "express";
import { handleLogout } from "../controllers/lougoutControllers.js";

const logoutRouter = express.Router();

logoutRouter.get("/", handleLogout);

export default logoutRouter;
