import { Link } from "react-router-dom";

const MiniMovieCard = () => {
  return (
    <div className="min-w-[40%] sm:min-w-[30%] md:min-w-[20%] outline outline-primary cursor-pointer hover:scale-[1.02] hover:shadow hover:shadow-tertiary transition-all">
      <div className="card-header">
        <Link to="/movie-details/:123">
          <img
            src="../../../favicon.webp"
            alt="Movie Image"
            className="object-cover w-full"
            loading="lazy"
          />
        </Link>
      </div>
      <div className="card-body bg-primary text-center p-4">
        <h3 className="text-black">Hello</h3>
        <p>Release: This year</p>
      </div>
    </div>
  );
};

export default MiniMovieCard;
