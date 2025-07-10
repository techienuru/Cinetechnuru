import { FaStar } from "react-icons/fa";
import BackButton from "../../components/Buttons/BackButton";
import { Link } from "react-router-dom";
import MiniMovieCard from "../../components/MovieCards/MiniMovieCard";
import styles from "./MovieDetails.module.css";
import SubmitButton from "../../components/Buttons/SubmitButton/SubmitButton";
import GradientButton from "../../components/Buttons/GradientButton/GradientButton";
import Notification from "../../components/Notification/Notification";
import { useState } from "react";

const MovieDetails = () => {
  const [showReviewBox, setShowReviewBox] = useState(false);
  const [rating, setRating] = useState(0);

  console.log(rating);

  return (
    <main>
      {/* <Notification message="Added to Favorites" type="success" /> */}
      {/*  Start Of Movie Details Inner Section */}
      <section className="my-20">
        <div className="flex justify-between mb-5">
          <BackButton text="Back" title="Back To Previous Page" />
          <Link to="/">
            <BackButton text="Back to Home" title="Back To Homepage" />
          </Link>
        </div>
        <div>
          <div className="flex justify-center items-center">
            <img
              src="../../../public/favicon.webp"
              alt="Movie Image"
              width="500"
              height="200"
              className="img-fluid"
              loading="lazy"
            />
          </div>
          <div className="movie-details-wrapper my-5">
            <h3 className="text-center font-bold my-7 text-xl">
              Long Distance
            </h3>
            <section className="mx-auto w-fit">
              <div className="ratings flex justify-center mb-4">
                <img src={`../../../ratings/rating-${rating}.png`} alt="" />
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
                <GradientButton text="Submit" title="Submit Rating" />
              </div>
              <div className="flex gap-x-3 mb-4">
                <button
                  type="button"
                  className="outline outline-yellow-500 px-3 py-2 rounded-md cursor-pointer hover:shadow hover:shadow-yellow-500 hover:scale-105"
                  title="Add movie to your Favorites"
                >
                  Add to Favorites
                </button>
                <button
                  type="button"
                  className="outline outline-secondary px-3 py-2 rounded-md cursor-pointer hover:shadow hover:shadow-secondary hover:scale-105"
                  title="Add movie to your Watchlist"
                >
                  Add to Watchlist
                </button>
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
                <div>
                  <textarea
                    id="user-review"
                    className="w-full text-white p-2 border border-primary focus:shadow-md focus:shadow-primary caret-primary"
                    placeholder="Write a Review..."
                    rows="5"
                  ></textarea>
                  <SubmitButton text="Submit Review" />
                </div>
              )}
            </section>
            <p className="flex mb-4">
              <FaStar className="text-amber-300 mr-1" />
              6.3 / 10
            </p>
            <p className="mb-4">
              <span className="font-bold text-tertiary">Release date: </span>
              2024-07-12
            </p>
            <p className="mb-4">
              After crash-landing on an alien planet, an asteroid miner must
              contend with the challenges of his new surroundings, while making
              his way across the harsh terrain to the only other survivor – a
              woman who is trapped in her escape pod.
            </p>
            <p className="mb-7">
              <span className="text-tertiary font-bold">Genre: </span> Science
              Fiction | Comedy | Action.
            </p>

            <Link
              to=""
              className="btnGradient2 px-3 py-2 rounded-md cursor-pointer text-black hover:text-white"
            >
              Visit Movie Homepage
            </Link>

            <h5 className="text-center text-xl font-bold my-3">MOVIE INFO</h5>
            <p className="mb-4">
              <span className="text-amber-500">Revenue: </span>
              <span className="revenue-text">$0</span>
            </p>
            <p className="mb-4">
              <span className="text-amber-500">Runtime: </span>
              <span className="runtime-text">87 minutes</span>
            </p>
            <p className="mb-4">
              <span className="text-amber-500">Status: </span>
              <span className="status-text">Released</span>
            </p>
            <p className="mb-4">
              <span className="text-amber-500">Production Companies: </span>
              <span className="prdtn-company-text">
                DreamWorks Pictures | Reliance Entertainment | Automatik
                Entertainment | Speck Gordon.
              </span>
            </p>
          </div>
        </div>
      </section>
      {/* End Of Movie Details Inner Section  */}

      {/* <!-- Start Of Movies You might like Section --> */}
      <section className="suggested-movies-section mb-5">
        <h3 className="text-center text-xl mb-5">Movies You Might Like</h3>
        <div
          className={`${styles.suggestedMoviesFlex} flex flex-row flex-nowrap gap-x-4 overflow-x-scroll py-[10px] px-5`}
        >
          <MiniMovieCard></MiniMovieCard>
          <MiniMovieCard></MiniMovieCard>
          <MiniMovieCard></MiniMovieCard>
          <MiniMovieCard></MiniMovieCard>
          <MiniMovieCard></MiniMovieCard>
        </div>
      </section>
      {/* <!-- End Of Movies You might like Section --> */}
    </main>
  );
};

export default MovieDetails;
