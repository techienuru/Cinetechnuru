import { useState } from "react";
import MovieCard from "../../components/MovieCards/MovieCard";
import { useEffect } from "react";
import { baseUrl } from "../../config";
import MaxiPreLoader from "../../components/Preloaders/MaxiPreLoader";
import MaxiErrorCard from "../../components/ErrorCards/MaxiErrorCard";
import useCollectToken from "../../Hooks/useCollectToken";
import useFetchDetails from "../../Hooks/useFetchDetails";
import EmptyDataNotice from "../../components/EmptyDataNotice";
import LoginNotice from "../../components/LoginNotice";
import handleApiResponse from "../../util/handleApiResponse";

const WatchLater = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const { accessToken, refreshAccessToken } = useCollectToken();
  const { movieData, fetchDetails } = useFetchDetails();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!accessToken) return;
        const res = await fetch(`${baseUrl}/user/watchlist`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        });

        const { error, isTokenExpired, result } = await res.json();
        const apiResult = handleApiResponse(res, error, isTokenExpired);

        if (apiResult.retry) {
          const tokenValid = await refreshAccessToken();

          // If Refresh Token has expired
          if (!tokenValid.isValid) throw new Error(tokenValid.message);

          return;
        }

        await fetchDetails(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [accessToken]);

  if (isLoading) return <MaxiPreLoader />;
  if (error) return <MaxiErrorCard errorMessage={error} />;

  if (!movieData)
    return (
      <>
        <LoginNotice />
      </>
    );

  if (movieData)
    return (
      <main>
        {movieData?.length > 0 ? (
          <section className="mt-5" id="movies-section">
            <div className="w-fit mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl mb-5 relative before:absolute before:-bottom-1 before:left-1/3 before:bg-tertiary before:w-1/3 before:h-1 ">
                Watch Later
              </h2>
              <p className="text-md sm:text-xl mb-7">
                All the movies you plan to watch later
              </p>
            </div>
            <div className="flex gap-5 flex-wrap my-5">
              {movieData.map((movie) => (
                <MovieCard movieData={movie} key={movie.id} />
              ))}
            </div>
          </section>
        ) : (
          <EmptyDataNotice
            icon={"🍿"}
            text1={"Nothing queued up yet"}
            text2={"Find something worth watching and add it here!"}
          />
        )}
      </main>
    );
};

export default WatchLater;
