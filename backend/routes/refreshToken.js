import express from "express";
import refreshJWT from "../controllers/refreshTokenControllers.js";

const refreshRouter = express.Router();

refreshRouter.get("/", refreshJWT);

export default refreshRouter;
