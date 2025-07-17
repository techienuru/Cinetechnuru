const MovieFilter = ({ activeFilter, setActiveFilter }) => {
  return (
    <>
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
    </>
  );
};

export default MovieFilter;
