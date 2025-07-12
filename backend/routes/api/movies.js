import express from "express";
import tmdbOption from "../../config/tmdbOption.js";
import {
  getMovieDetails,
  getNewestMovies,
  getPopularMovies,
  getTopRatedMovies,
  handleSearchMovie,
} from "../../controllers/api/moviesControllers.js";

const moviesRouter = express.Router();

// All Routes Preceeded with "/api/movies"
moviesRouter.get("/popular", getPopularMovies);

moviesRouter.get("/newest", getNewestMovies);

moviesRouter.get("/top_rated", getTopRatedMovies);

moviesRouter.post("/:id", getMovieDetails);

moviesRouter.post("/search/:query", handleSearchMovie);

export default moviesRouter;
