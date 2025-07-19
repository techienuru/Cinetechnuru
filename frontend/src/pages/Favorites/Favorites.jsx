import { useState } from "react";
import { useEffect } from "react";
import MovieCard from "../../components/MovieCards/MovieCard";
import useCollectToken from "../../Hooks/useCollectToken";
import useFetchDetails from "../../Hooks/useFetchDetails";
import { baseUrl } from "../../config";
import MaxiPreLoader from "../../components/Preloaders/MaxiPreLoader";
import MaxiErrorCard from "../../components/ErrorCards/MaxiErrorCard";
import LoginNotice from "../../components/LoginNotice";
import EmptyDataNotice from "../../components/EmptyDataNotice";
import handleApiResponse from "../../util/handleApiResponse";

const Favorites = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const { accessToken, refreshAccessToken } = useCollectToken();
  const { movieData, fetchDetails } = useFetchDetails();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!accessToken) return;
        const res = await fetch(`${baseUrl}/user/favorites`, {
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
        {movieData.length > 0 ? (
          <section className="mt-5">
            <div className="w-fit mx-auto text-center">
              <h2 className="movies-heading text-2xl sm:text-3xl mb-5 relative before:absolute before:-bottom-1 before:left-1/3 before:bg-tertiary before:w-1/3 before:h-1 ">
                Favorites
              </h2>
              <p className="text-md sm:text-xl mb-7">
                All your favorite movies in one place
              </p>
            </div>
            <div className="flex gap-5 flex-wrap my-5">
              {movieData.map((data) => (
                <MovieCard movieData={data} key={data.id} />
              ))}
            </div>
          </section>
        ) : (
          <EmptyDataNotice
            icon={"❤️"}
            text1="No favorites yet"
            text2="Mark the movies you love and they'll show up here!"
          />
        )}
      </main>
    );
};
export default Favorites;
