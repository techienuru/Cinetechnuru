import express from "express";
import tmdbOption from "../../config/tmdbOption.js";
import {
  getMovieDetails,
  getNewestMovies,
  getPopularMovies,
  getTopRatedMovies,
  handleRecommendations,
  handleSearchMovie,
} from "../../controllers/api/moviesControllers.js";

const moviesRouter = express.Router();

// All Routes Preceeded with "/api/movies"
moviesRouter.get("/popular", getPopularMovies);

moviesRouter.get("/newest", getNewestMovies);

moviesRouter.get("/most-rated", getTopRatedMovies);

moviesRouter.get("/:id", getMovieDetails);

moviesRouter.get("/search/:query", handleSearchMovie);

moviesRouter.post("/recommendations", handleRecommendations);

export default moviesRouter;
