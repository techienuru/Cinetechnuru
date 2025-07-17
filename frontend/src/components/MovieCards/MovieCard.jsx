import { Link } from "react-router-dom";

const MovieCard = ({ movieData }) => {
  const { id, poster_path, release_date, title } = movieData;

  return (
    <>
      <div className="w-[100%] sm:w-[48%] md:w-[31%] xl:w-[23.5%] h-[400px] outline outline-primary cursor-pointer hover:scale-103 hover:shadow hover:shadow-tertiary transition-all">
        <Link to={`/movie-details/${id}`}>
          <div className="h-[80%]">
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/original${poster_path}`
                  : "../../../favicon.webp"
              }
              className="h-full w-full object-cover"
              alt="Movie Image"
              loading="lazy"
            />
          </div>
          <div className="h-[20%] card-body bg-primary text-center p-4 font-bold">
            <p className="text-black">{title}</p>
            <p>Release: {release_date}</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default MovieCard;
