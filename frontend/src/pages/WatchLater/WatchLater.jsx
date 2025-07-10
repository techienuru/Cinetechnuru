import MovieCard from "../../components/MovieCards/MovieCard";

const WatchLater = () => {
  return (
    <main>
      <section className="mt-5" id="movies-section">
        <div className="w-fit mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl mb-5 relative before:absolute before:-bottom-1 before:left-1/3 before:bg-tertiary before:w-1/3 before:h-1 ">
            Watch Later
          </h2>
          <p className="text-md sm:text-xl mb-7">
            All the movies you plan to watch later
          </p>
        </div>
        <div className="flex gap-5 flex-wrap my-5">
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
        </div>
      </section>
    </main>
  );
};

export default WatchLater;
