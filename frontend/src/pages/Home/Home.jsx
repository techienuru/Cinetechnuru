import { useState } from "react";
import MovieCard from "../../components/MovieCards/MovieCard";
import GradientButton from "../../components/Buttons/GradientButton/GradientButton";
import MaxiPreLoader from "../../components/Preloader/MaxiPreLoader";
import MiniPreLoader from "../../components/Preloader/MiniPreLoader";

const Home = () => {
  const [activeFilter, setActiveFilter] = useState("popular");

  return (
    <>
      {/* <MaxiPreLoader /> */}
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

        <section className="movies-section mt-5" id="movies-section">
          <div className="movies-section-header w-fit mx-auto text-center">
            <h2 className="movies-heading text-2xl sm:text-3xl mb-5 relative before:absolute before:-bottom-1 before:left-1/3 before:bg-tertiary before:w-1/3 before:h-2 -z-1">
              Popular Shows
            </h2>
            <p className="text-xl sm:text-2xl mb-7">Online Streaming</p>
            <div className="movies-filter border border-tertiary rounded-full p-3 flex gap-x-3">
              <button
                className={`filterBtn ${
                  activeFilter === "popular" ? "btnGradient" : ""
                }`}
                onClick={() => {
                  setActiveFilter("popular");
                }}
              >
                Popular
              </button>
              <button
                className={`filterBtn ${
                  activeFilter === "newest" ? "btnGradient" : ""
                }`}
                onClick={() => {
                  setActiveFilter("newest");
                }}
              >
                Newest
              </button>
              <button
                className={`filterBtn ${
                  activeFilter === "most-rated" ? "btnGradient" : ""
                }`}
                onClick={() => {
                  setActiveFilter("most-rated");
                }}
              >
                Most Rated
              </button>
            </div>
          </div>
          {/* <MiniPreLoader /> */}
          <div className="flex gap-5 flex-wrap my-5 relative">
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
