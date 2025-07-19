import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { baseUrl } from "../../config";
import Notification from "../../components/Notification/Notification";
import useCollectToken from "../../Hooks/useCollectToken";
import useShowNotification from "../../Hooks/useShowNotification";
import handleApiResponse from "../../util/handleApiResponse";
import { saveRecommendations } from "../../util/handleRecommendations";

const useMovieDetails = () => {
  const [showReviewBox, setShowReviewBox] = useState(false);
  const [rating, setRating] = useState(0);
  const [remoteRating, setRemoteRating] = useState(0);
  const [review, setReview] = useState("");

  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isRating, setIsRating] = useState(false);
  const [isFavoriting, setIsFavoriting] = useState(false);
  const [isWatchListing, setIsWatchListing] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const { showNotification, setShowNotification } = useShowNotification();

  const { movieId } = useParams();
  const { accessToken, refreshAccessToken } = useCollectToken();
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
        const { error, isTokenExpired, result } = await res.json();
        const apiResult = handleApiResponse(res, error, isTokenExpired);

        // If Access Token has expired
        if (apiResult.retry) {
          const tokenValid = await refreshAccessToken();
          // If Refresh Token has  expired
          if (!tokenValid.isValid) throw new Error(tokenValid.message);

          return;
        }

        setRemoteRating(result?.rating || 0);
        setRating(result?.rating || 0);
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
      const { error, isTokenExpired, message } = await res.json();
      const apiResult = handleApiResponse(res, error, isTokenExpired);

      // If Access Token has expired
      if (apiResult.retry) {
        const tokenValid = await refreshAccessToken();
        // If Refresh Token has  expired
        if (!tokenValid.isValid) throw new Error(tokenValid.message);

        return;
      }

      setShowNotification({ message, type: "success" });
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
      const { error, isTokenExpired, message } = await res.json();
      const apiResult = handleApiResponse(res, error, isTokenExpired);

      // If Access Token has expired
      if (apiResult.retry) {
        const tokenValid = await refreshAccessToken();
        // If Refresh Token has  expired
        if (!tokenValid.isValid) throw new Error(tokenValid.message);

        return;
      }

      setShowNotification({ message, type: "success" });
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
      const { error, isTokenExpired, message } = await res.json();
      const apiResult = handleApiResponse(res, error, isTokenExpired);

      // If Access Token has expired
      if (apiResult.retry) {
        const tokenValid = await refreshAccessToken();
        // If Refresh Token has  expired
        if (!tokenValid.isValid) throw new Error(tokenValid.message);

        return;
      }

      setShowNotification({ message, type: "success" });
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
      const { error, isTokenExpired, message } = await res.json();
      const apiResult = handleApiResponse(res, error, isTokenExpired);

      // If Access Token has expired
      if (apiResult.retry) {
        const tokenValid = await refreshAccessToken();
        // If Refresh Token has  expired
        if (!tokenValid.isValid) throw new Error(tokenValid.message);

        return;
      }

      if (rating >= 30) saveRecommendations(movieData.genres);

      setShowNotification({ message, type: "success" });
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
