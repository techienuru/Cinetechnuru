import { Link } from "react-router-dom";

const MiniMovieCard = ({ moviesData }) => {
  const { id, poster_path, release_date, title } = moviesData;
  return (
    <div className="min-w-[40%] sm:min-w-[30%] md:min-w-[20%] outline outline-primary cursor-pointer hover:scale-[1.02] hover:shadow hover:shadow-tertiary transition-all">
      <div className="card-header">
        <Link to={`/movie-details/${id}`}>
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/original${poster_path}`
                : "../../../favicon.webp"
            }
            alt="Movie Image"
            className="object-cover w-full"
            loading="lazy"
          />
        </Link>
      </div>
      <div className="card-body bg-primary text-center p-4">
        <p className="text-black">{title}</p>
        <p>Release: {release_date}</p>
      </div>
    </div>
  );
};

export default MiniMovieCard;
