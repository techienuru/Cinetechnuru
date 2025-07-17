import express from "express";
import {
  getProfile,
  updateProfile,
} from "../controllers/manageProfileControllers.js";

const profileRouter = express.Router();

profileRouter.route("/").put(updateProfile).get(getProfile);

export default profileRouter;
