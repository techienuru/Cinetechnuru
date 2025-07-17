import { useParams } from "react-router-dom";
import MovieCard from "../../components/MovieCards/MovieCard";
import { useEffect } from "react";
import { useState } from "react";
import MaxiPreLoader from "../../components/Preloaders/MaxiPreLoader";
import MaxiErrorCard from "../../components/ErrorCards/MaxiErrorCard";
import { baseUrl } from "../../config";

const SearchResult = () => {
  const { searchTerm } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movieData, setMovieData] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/movies/search/${searchTerm}`);
        const data = await res.json();
        setMovieData(data?.result?.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  if (isLoading) return <MaxiPreLoader />;
  if (error) return <MaxiErrorCard errorMessage={error} />;

  if (movieData)
    return (
      <main>
        <section className="mt-5">
          <div className="w-fit mx-auto text-center">
            <h2 className="movies-heading text-2xl sm:text-3xl mb-5 relative before:absolute before:-bottom-1 before:left-1/3 before:bg-tertiary before:w-1/3 before:h-1 ">
              Search Results
            </h2>
            <p className="text-md sm:text-xl mb-7">
              Search Results for "{searchTerm}"
            </p>
          </div>
          {/* <div className="text-center text-secondary">
          <p className="text-lg">Your watchlist is feeling lonely 👀</p>
          <p>Add something to binge later!</p>
        </div> */}
          <div className="flex gap-5 flex-wrap my-5">
            {movieData.map((data) => (
              <MovieCard movieData={data} key={data?.id} />
            ))}
          </div>
        </section>
      </main>
    );
};

export default SearchResult;
