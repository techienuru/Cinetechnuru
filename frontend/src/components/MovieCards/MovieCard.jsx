import { Link } from "react-router-dom";

const MovieCard = () => {
  return (
    <>
      <div className="max-[370px]:flex-4/5 flex-1/3 sm:flex-1/5 outline outline-primary cursor-pointer hover:scale-103 hover:shadow hover:shadow-tertiary transition-all">
        <Link to="/movie-details/123">
          <div>
            <img
              src="../../../public/favicon.webp"
              className="w-full object-cover"
              alt="Movie Image"
            />
          </div>
          <div className="card-body bg-primary text-center p-4 font-bold">
            <p className="text-black">The Old Guard 2</p>
            <p>Release: 2025-07-11</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default MovieCard;
