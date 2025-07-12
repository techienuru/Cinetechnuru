import express from "express";
import { updateProfile } from "../controllers/manageProfileControllers.js";

const profileRouter = express.Router();

profileRouter.put("/", updateProfile);

export default profileRouter;
