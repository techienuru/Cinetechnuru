import { useState } from "react";
import MovieCard from "../../components/MovieCards/MovieCard";
import styles from "./Home.module.css";
import GradientButton from "../../components/Buttons/GradientButton/GradientButton";
import MaxiPreLoader from "../../components/Preloaders/MaxiPreLoader";
import MiniPreLoader from "../../components/Preloaders/MiniPreLoader";
import { useEffect } from "react";
import { baseUrl } from "../../config";
import MovieFilter from "../../components/MovieFilter/MovieFilter";
import MiniErrorCard from "../../components/ErrorCards/MiniErrorCard";
import MiniMovieCard from "../../components/MovieCards/MiniMovieCard";

const Home = () => {
  const [activeFilter, setActiveFilter] = useState("popular");

  // movies state
  const [moviesDatas, setMoviesDatas] = useState([]);
  const [isMoviesLoading, setIsMoviesLoading] = useState(true);
  const [error, setError] = useState(false);

  // recommendation state
  const [recommendations, setRecommendations] = useState([]);
  const [isRecommLoading, setIsRecommLoading] = useState(true);
  const [recommError, setRecommError] = useState(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const recommendations = JSON.parse(
          localStorage.getItem("recommendations")
        ) || [
          { id: 28, name: "Action" },
          { id: 12, name: "Adventure" },
        ];

        const recommendationsID = recommendations.map(
          (recommendation) => recommendation.id
        );

        const res = await fetch(`${baseUrl}/api/movies/recommendations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            genres: recommendationsID,
          }),
        });

        if (!res.ok)
          throw new Error(
            "Something went wrong in the server. Please try again!"
          );

        const data = await res.json();

        setRecommendations(data.result.results);
      } catch (err) {
        setRecommError(err.message);
      } finally {
        setIsRecommLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsMoviesLoading(true);
      try {
        const res = await fetch(`${baseUrl}/api/movies/${activeFilter}`);

        if (!res.ok)
          throw new Error(
            "Something went wrong in the server. Please try again!"
          );

        const data = await res.json();

        setMoviesDatas(data?.result?.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsMoviesLoading(false);
      }
    };

    fetchMovies();
  }, [activeFilter]);

  return (
    <>
      <main className="mt-20">
        <section className="hero-section text-center py-8 mb-25">
          <h1 className="font-bold text-2xl/11 sm:text-4xl/loose">
            Explore Endless Movie Series
            <span className="block">
              Dive into Entertainment with{" "}
              <span className="clipText">CineTechNuru</span>
            </span>
          </h1>
          <h3 className="font-medium leading-7">
            Stream the latest movies and series, anytime, anywhere. Enjoy
            high-quality entertainment with personalized recommendations at your
            fingertips.
          </h3>
          <div className="hero-cta flex justify-center mt-15">
            <a href="#movies-section">
              <GradientButton text="Start Watching Now" title="Get Started" />
            </a>
          </div>
        </section>

        {/* <!-- Start Of "Top Picks For You" Section --> */}
        <section className="suggested-movies-section mb-5">
          <h2 className="movies-heading text-2xl w-fit mx-auto sm:text-3xl mb-5 relative before:absolute before:-bottom-1 before:left-[25%] before:bg-tertiary before:w-1/2  before:h-2 -z-1">
            Top Picks For You
          </h2>
          {isRecommLoading ? (
            <MiniPreLoader />
          ) : recommError ? (
            <MiniErrorCard errorMessage={recommError} />
          ) : (
            <div
              className={`${styles.suggestedMoviesFlex} flex flex-row flex-nowrap gap-x-4 overflow-x-scroll py-[10px] px-5`}
            >
              {recommendations.length > 0 &&
                recommendations.map((recommendation) => {
                  return (
                    <MiniMovieCard
                      moviesData={recommendation}
                      key={recommendation.id}
                    ></MiniMovieCard>
                  );
                })}
            </div>
          )}
        </section>
        {/* <!-- End Of "Top Picks For You" Section --> */}

        <section className="movies-section mt-5" id="movies-section">
          <div className="movies-section-header w-fit mx-auto text-center">
            <h2 className="movies-heading text-2xl sm:text-3xl w-fit mx-auto mb-5 relative before:absolute before:-bottom-1 before:left-[30%] before:bg-tertiary before:w-1/3 before:h-2 -z-1">
              Popular Shows
            </h2>
            <p className="text-xl sm:text-2xl mb-7">Online Streaming</p>
            <MovieFilter
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
          </div>
          {isMoviesLoading ? (
            <MiniPreLoader />
          ) : error ? (
            <MiniErrorCard errorMessage={error} />
          ) : (
            <div className="flex gap-5 flex-wrap my-5 relative">
              {moviesDatas.length > 0 &&
                moviesDatas.map((movieData) => (
                  <MovieCard movieData={movieData} key={movieData.id} />
                ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Home;
