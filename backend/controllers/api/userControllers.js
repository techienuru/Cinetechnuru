import User from "../../models/User.js";
import Rating from "../../models/Rating.js";
import Favorite from "../../models/Favorite.js";
import Watchlist from "../../models/Watchlist.js";
import Review from "../../models/Review.js";

export const handlePostRating = async (req, res, next) => {
  const { email } = req;

  if (!req?.body?.rating || !req?.body?.movieId)
    return res.status(400).json({ error: "ratings, and movieId is required." });
  const { rating, movieId } = req.body;

  try {
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) return res.status(403).json({ error: "User not found." });
    const userId = foundUser._id;

    const foundRating = await Rating.findOne({ userId, movieId }).exec();

    let result;

    //If User has not dropped rating before
    if (!foundRating) {
      result = await Rating.create({ userId, movieId, rating });
    } else {
      foundRating.rating = rating;
      result = await foundRating.save();
    }

    res.status(201).json({
      message: "success",
      result,
    });
  } catch (err) {
    next(err);
  }
};

export const handleGetRating = async (req, res, next) => {
  const { email } = req;
  const { movieId } = req.params;

  try {
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) return res.status(403).json({ error: "User not found." });

    const userId = foundUser._id;

    const foundRating = await Rating.findOne({ userId, movieId }).exec();

    res.json({ message: "success", result: foundRating });
  } catch (err) {
    next(err);
  }
};

export const handleFavorites = async (req, res, next) => {
  const { email } = req;

  if (!req?.body?.movieId)
    return res.status(400).json({ error: "movieId is required." });
  const { movieId } = req.body;

  try {
    const foundUser = await User.findOne({ email }).exec();
    const userId = foundUser._id;

    const foundFavorite = await Favorite.findOne({ userId, movieId }).exec();

    if (!foundFavorite) {
      const result = await Favorite.create({ userId, movieId });

      res.status(201).json({ message: "Movie added to Favorites", result });
    } else {
      const result = await Favorite.deleteOne({ userId, movieId }).exec();

      res.json({ message: "Movie deleted from Favorites", result });
    }
  } catch (err) {
    next(err);
  }
};

export const getFavorites = async (req, res, next) => {
  const { email } = req;

  try {
    const foundUser = await User.findOne({ email }).exec();
    const userId = foundUser._id;

    const foundFavorites = await Favorite.find({ userId }).exec();

    res.json({ message: "success", result: foundFavorites });
  } catch (err) {
    next(err);
  }
};

export const handleWatchlist = async (req, res, next) => {
  const { email } = req;

  if (!req?.body?.movieId)
    return res.status(400).json({ error: "movieId is required." });
  const { movieId } = req.body;

  try {
    const foundUser = await User.findOne({ email }).exec();
    const userId = foundUser._id;

    const foundWatchlist = await Watchlist.findOne({ userId, movieId }).exec();

    if (!foundWatchlist) {
      const result = await Watchlist.create({ userId, movieId });

      res.status(201).json({ message: "Movie added to Watchlist", result });
    } else {
      const result = await Watchlist.deleteOne({ userId, movieId }).exec();

      res.json({ message: "Movie deleted from Favorites", result });
    }
  } catch (err) {
    next(err);
  }
};

export const getWatchlist = async (req, res, next) => {
  const { email } = req;

  try {
    const foundUser = await User.findOne({ email }).exec();
    const userId = foundUser._id;

    const foundWatchlist = await Watchlist.find({ userId }).exec();

    res.json({ message: "success", result: foundWatchlist });
  } catch (err) {
    next(err);
  }
};

export const addReview = async (req, res, next) => {
  const { email } = req;

  if (!req?.body?.movieId || !req?.body?.review)
    return res.status(400).json({ error: "movieId, and review are required." });
  const { movieId, review } = req.body;

  try {
    const foundUser = await User.findOne({ email }).exec();
    const userId = foundUser._id;

    const result = await Review.create({ userId, movieId, review });

    res.status(201).json({ message: "Review added to successfully", result });
  } catch (err) {
    next(err);
  }
};

export const getReviews = async (req, res, next) => {
  const { email } = req;
  const { movieId } = req.params;

  try {
    const foundReviews = await Review.find({ movieId }).exec();

    res.json({ message: "success", result: foundReviews });
  } catch (err) {
    next(err);
  }
};
