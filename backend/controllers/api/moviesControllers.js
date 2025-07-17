import tmdbOption from "../../config/tmdbOption.js";

export const getPopularMovies = async (req, res, next) => {
  try {
    const result = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      tmdbOption
    );
    const moviesObj = await result.json();

    res.json({ message: "success", result: moviesObj });
  } catch (err) {
    next(err);
  }
};

export const getNewestMovies = async (req, res, next) => {
  try {
    const result = await fetch(
      "https://api.themoviedb.org/3/discover/movie?sort_by=release_date.desc",
      tmdbOption
    );

    const moviesObj = await result.json();

    res.json({ message: "success", result: moviesObj });
  } catch (err) {
    next(err);
  }
};

export const getTopRatedMovies = async (req, res, next) => {
  try {
    const result = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      tmdbOption
    );
    const moviesObj = await result.json();

    res.json({ message: "success", result: moviesObj });
  } catch (err) {
    next(err);
  }
};

export const getMovieDetails = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=videos`,
      tmdbOption
    );
    const moviesObj = await result.json();
    const trailer = moviesObj.videos.results.find(
      (vid) => vid.type === "Trailer"
    );

    const trailerUrl = `https://www.youtube.com/embed/${trailer?.key}`;
    moviesObj.trailerUrl = trailerUrl;

    res.json({ message: "success", result: moviesObj });
  } catch (err) {
    next(err);
  }
};

export const handleSearchMovie = async (req, res, next) => {
  const { query } = req.params;
  try {
    const result = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}`,
      tmdbOption
    );

    const moviesObj = await result.json();
    res.json({ message: "success", result: moviesObj });
  } catch (err) {
    next(err);
  }
};
