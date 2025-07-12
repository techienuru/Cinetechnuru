import express from "express";
import {
  handleFavorites,
  handleGetRating,
  handlePostRating,
  getFavorites,
  handleWatchlist,
  getWatchlist,
  addReview,
  getReviews,
} from "../../controllers/api/userControllers.js";

const userRouter = express.Router();

// All Routes are preceeded with "/user"
userRouter.post("/ratings", handlePostRating);
userRouter.get("/ratings/:movieId", handleGetRating);

userRouter.route("/favorites").post(handleFavorites).get(getFavorites);

userRouter.route("/watchlist").post(handleWatchlist).get(getWatchlist);

userRouter.post("/reviews", addReview);
userRouter.get("/reviews/:movieId", getReviews);

export default userRouter;
