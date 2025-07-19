import { FaStar } from "react-icons/fa";
import BackButton from "../../components/Buttons/BackButton";
import LoadingButton from "../../components/Buttons/LoadingButton";
import SubmitButton from "../../components/Buttons/SubmitButton/SubmitButton";
import GradientButton from "../../components/Buttons/GradientButton/GradientButton";
import Notification from "../../components/Notification/Notification";

import MaxiPreLoader from "../../components/Preloaders/MaxiPreLoader";
import MaxiErrorCard from "../../components/ErrorCards/MaxiErrorCard";
import useMovieDetails from "./useMovieDetails";
import { Link } from "react-router-dom";

const MovieDetails = () => {
  const {
    showReviewBox,
    setShowReviewBox,
    rating,
    setRating,
    remoteRating,
    movieData,
    isLoading,
    error,
    isRating,
    isFavoriting,
    isWatchListing,
    isReviewing,
    showNotification,
    handleOnClick,
    addToFavorite,
    addToWatchList,
    review,
    addReview,
    setReview,
    addRating,
  } = useMovieDetails();

  return (
    <>
      {isLoading ? (
        <MaxiPreLoader />
      ) : error ? (
        <MaxiErrorCard errorMessage={error} />
      ) : (
        movieData && (
          <main>
            {showNotification && (
              <Notification
                message={showNotification.message}
                type={showNotification.type}
              />
            )}
            {/*  Start Of Movie Details Inner Section */}
            <section className="my-20">
              <div className="flex justify-between mb-5">
                <BackButton
                  text="Back"
                  title="Back To Previous Page"
                  onClick={handleOnClick}
                />
                <Link to="/">
                  <BackButton text="Back to Home" title="Back To Homepage" />
                </Link>
              </div>
              <div>
                <div className="flex justify-center items-center">
                  <iframe
                    width="560"
                    height="315"
                    src={movieData.trailerUrl}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="movie-details-wrapper my-5">
                  <h3 className="text-center font-bold my-7 text-xl">
                    {movieData.title}
                  </h3>
                  <section className="mx-auto w-fit">
                    <div className="ratings flex justify-center mb-4">
                      <img
                        src={`../../../ratings/rating-${remoteRating}.png`}
                        alt=""
                      />
                    </div>
                    <div className="rate-movies flex justify-center gap-x-2 mb-4">
                      <select
                        name=""
                        id=""
                        value={rating}
                        className="p-2  border-primary shadow-md shadow-primary *:text-black border *:bg-tertiary *:border *:border-primary"
                        onChange={(e) => {
                          setRating(e.target.value);
                        }}
                        required
                      >
                        <option value="0">0</option>
                        <option value="05">0.5</option>
                        <option value="10">1</option>
                        <option value="15">1.5</option>
                        <option value="20">2</option>
                        <option value="25">2.5</option>
                        <option value="30">3</option>
                        <option value="35">3.5</option>
                        <option value="40">4</option>
                        <option value="45">4.5</option>
                        <option value="50">5</option>
                      </select>
                      {isRating ? (
                        <LoadingButton />
                      ) : (
                        <GradientButton
                          text="Submit"
                          title="Submit Rating"
                          handleOnClick={addRating}
                        />
                      )}
                    </div>
                    <div className="flex gap-x-3 mb-4">
                      {isFavoriting ? (
                        <LoadingButton />
                      ) : (
                        <button
                          type="button"
                          className="outline outline-yellow-500 px-3 py-2 rounded-md cursor-pointer hover:shadow hover:shadow-yellow-500 hover:scale-105"
                          title="Add movie to your Favorites"
                          onClick={addToFavorite}
                        >
                          Add to Favorites
                        </button>
                      )}
                      {isWatchListing ? (
                        <LoadingButton />
                      ) : (
                        <button
                          type="button"
                          className="outline outline-secondary px-3 py-2 rounded-md cursor-pointer hover:shadow hover:shadow-secondary hover:scale-105"
                          title="Add movie to your Watchlist"
                          onClick={addToWatchList}
                        >
                          Add to Watchlist
                        </button>
                      )}
                      <button
                        type="button"
                        className="outline outline-primary px-3 py-2 rounded-md cursor-pointer hover:shadow hover:shadow-primary hover:scale-105"
                        title="Drop a review on the movie"
                        onClick={() => {
                          setShowReviewBox(!showReviewBox);
                        }}
                      >
                        Write a Review
                      </button>
                    </div>
                    {showReviewBox && (
                      <form onSubmit={(e) => addReview(e)}>
                        <textarea
                          id="user-review"
                          className="w-full text-white p-2 border border-primary focus:shadow-md focus:shadow-primary caret-primary"
                          placeholder="Write a Review..."
                          rows="5"
                          value={review}
                          onChange={(e) => setReview(e.target.value)}
                          required
                        ></textarea>
                        <SubmitButton
                          text="Submit Review"
                          isDisabled={isReviewing}
                        />
                      </form>
                    )}
                  </section>
                  <p className="flex mb-4">
                    <FaStar className="text-amber-300 mr-1" />
                    {movieData.vote_average} / 10
                  </p>
                  <p className="mb-4">
                    <span className="font-bold text-tertiary">
                      Release date:{" "}
                    </span>
                    {movieData.release_date}
                  </p>
                  <p className="mb-4">{movieData.overview}</p>
                  <p className="mb-7">
                    <span className="text-tertiary font-bold">Genre: </span>{" "}
                    {movieData.genres.map((genre) => `${genre.name} | `)}
                  </p>

                  <Link
                    to={movieData.homepage}
                    className="btnGradient2 px-3 py-2 rounded-md cursor-pointer text-black hover:text-white"
                  >
                    Visit Movie Homepage
                  </Link>

                  <h5 className="text-center text-xl font-bold my-3">
                    MOVIE INFO
                  </h5>
                  <p className="mb-4">
                    <span className="text-amber-500">Revenue: </span>
                    <span className="revenue-text">${movieData.revenue}</span>
                  </p>
                  <p className="mb-4">
                    <span className="text-amber-500">Runtime: </span>
                    <span className="runtime-text">
                      {movieData.runtime} minutes
                    </span>
                  </p>
                  <p className="mb-4">
                    <span className="text-amber-500">Status: </span>
                    <span className="status-text">{movieData.status}</span>
                  </p>
                  <p className="mb-4">
                    <span className="text-amber-500">
                      Production Companies:{" "}
                    </span>
                    <span className="prdtn-company-text">
                      {movieData.production_companies.map(
                        (prodCompany) => `${prodCompany.name} | `
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </section>
            {/* End Of Movie Details Inner Section  */}
          </main>
        )
      )}
    </>
  );
};

export default MovieDetails;
