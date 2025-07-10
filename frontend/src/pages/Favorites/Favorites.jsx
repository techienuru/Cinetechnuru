import MovieCard from "../../components/MovieCards/MovieCard";

const Favorites = () => {
  return (
    <main>
      <section className="mt-5">
        <div className="w-fit mx-auto text-center">
          <h2 className="movies-heading text-2xl sm:text-3xl mb-5 relative before:absolute before:-bottom-1 before:left-1/3 before:bg-tertiary before:w-1/3 before:h-1 ">
            Favorites
          </h2>
          <p className="text-md sm:text-xl mb-7">
            All your favorite movies in one place
          </p>
        </div>
        {/* <div className="text-center text-secondary">
          <p className="text-lg">Your watchlist is feeling lonely 👀</p>
          <p>Add something to binge later!</p>
        </div> */}
        <div className="flex gap-5 flex-wrap my-5">
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
        </div>
      </section>
    </main>
  );
};

export default Favorites;
