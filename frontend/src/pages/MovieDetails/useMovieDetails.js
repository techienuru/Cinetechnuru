import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { baseUrl } from "../../config";
import Notification from "../../components/Notification/Notification";
import useCollectToken from "../../Hooks/useCollectToken";
import useShowNotification from "../../Hooks/useShowNotification";

const useMovieDetails = () => {
  const [showReviewBox, setShowReviewBox] = useState(false);
  const [rating, setRating] = useState(0);
  const [remoteRating, setRemoteRating] = useState(0);
  const [review, setReview] = useState("");

  const [movieData, setMovieData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isRating, setIsRating] = useState(false);
  const [isFavoriting, setIsFavoriting] = useState(false);
  const [isWatchListing, setIsWatchListing] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const { showNotification, setShowNotification } = useShowNotification();

  const { movieId } = useParams();
  const { accessToken, saveAccessToken, refreshAccessToken } =
    useCollectToken();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/movies/${movieId}`);
        const data = await res.json();

        if (data.error)
          throw new Error(`Something went wrong on the server.Please reload.`);

        setMovieData(data?.result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await fetch(`${baseUrl}/user/ratings/${movieId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();

        // If Access Token has expired
        if (data?.error && data?.error === "token has expired.") {
          const tokenValid = await refreshAccessToken();
          // If Refresh Token has not expired
          if (tokenValid.isValid) {
            return fetchRating();
          } else {
            throw new Error(tokenValid.message);
          }
        }

        setRemoteRating(data?.result?.rating || 0);
        setRating(data?.result?.rating || 0);
      } catch (err) {
        setShowNotification({ message: err.message, type: "error" });
      }
    };
    fetchRating();
  }, [isRating]);

  const handleOnClick = () => {
    navigate(-1);
  };

  const addToFavorite = async () => {
    setIsFavoriting(true);
    try {
      const res = await fetch(`${baseUrl}/user/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          movieId,
        }),
      });
      const data = await res.json();
      if (data?.error && data?.error === "token has expired.") {
        const tokenValid = await refreshAccessToken();
        if (tokenValid.isValid) {
          return addToFavorite();
        } else {
          throw new Error(tokenValid.message);
        }
      }
      setShowNotification({ message: data.message, type: "success" });
    } catch (err) {
      setShowNotification({ message: err.message, type: "error" });
    } finally {
      setIsFavoriting(false);
    }
  };

  const addToWatchList = async () => {
    setIsWatchListing(true);
    try {
      const res = await fetch(`${baseUrl}/user/watchlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          movieId,
        }),
      });
      const data = await res.json();
      // If Access Token has expired
      if (data?.error && data?.error === "token has expired.") {
        const tokenValid = await refreshAccessToken();
        if (tokenValid.isValid) {
          return addToWatchList();
        } else {
          throw new Error(tokenValid.message);
        }
      }
      setShowNotification({ message: data.message, type: "success" });
    } catch (err) {
      setShowNotification({ message: err.message, type: "error" });
    } finally {
      setIsWatchListing(false);
    }
  };

  const addReview = async (e) => {
    e.preventDefault();
    setIsReviewing(true);
    try {
      const res = await fetch(`${baseUrl}/user/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          movieId,
          review,
        }),
      });
      const data = await res.json();
      // If Access Token has expired
      if (data?.error && data?.error === "token has expired.") {
        const tokenValid = await refreshAccessToken();
        if (tokenValid.isValid) {
          return addToWatchList();
        } else {
          throw new Error(tokenValid.message);
        }
      }
      setShowNotification({ message: data.message, type: "success" });
    } catch (err) {
      setShowNotification({ message: err.message, type: "error" });
    } finally {
      setIsReviewing(false);
    }
  };

  const addRating = async () => {
    setIsRating(true);
    try {
      const res = await fetch(`${baseUrl}/user/ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          movieId,
          rating,
        }),
      });
      const data = await res.json();
      if (res.status === 400) throw new Error("Bad Request.");

      // If Access Token has expired
      if (data?.error && data?.error === "token has expired.") {
        const tokenValid = await refreshAccessToken();
        if (tokenValid.isValid) {
          return addRating();
        } else {
          throw new Error(tokenValid.message);
        }
      }
      setShowNotification({ message: data.message, type: "success" });
    } catch (err) {
      setShowNotification({ message: err.message, type: "error" });
    } finally {
      setIsRating(false);
    }
  };

  return {
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
  };
};

export default useMovieDetails;
