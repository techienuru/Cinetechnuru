import { useState } from "react";
import { baseUrl } from "../config";

const useFetchDetails = () => {
  const [movieData, setMovieData] = useState(null);

  const fetchDetails = async (movies) => {
    const promises = await movies?.map(async (movie) => {
      const res = await fetch(`${baseUrl}/api/movies/${movie.movieId}`);
      const data = await res.json();
      return data.result;
    });
    const allDetails = await Promise.all(promises);
    setMovieData(allDetails);
  };

  return { movieData, fetchDetails };
};
export default useFetchDetails;
