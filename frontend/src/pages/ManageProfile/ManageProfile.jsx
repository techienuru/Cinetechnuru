import { Link } from "react-router-dom";
import SubmitButton from "../../components/Buttons/SubmitButton/SubmitButton";
import { useState } from "react";
import useCollectToken from "../../Hooks/useCollectToken";
import MaxiPreLoader from "../../components/Preloaders/MaxiPreLoader";
import MaxiErrorCard from "../../components/ErrorCards/MaxiErrorCard";
import LoginNotice from "../../components/LoginNotice";
import { useEffect } from "react";
import { baseUrl } from "../../config";
import useShowNotification from "../../Hooks/useShowNotification";
import Notification from "../../components/Notification/Notification";
import handleApiResponse from "../../util/handleApiResponse";

const ManageProfile = () => {
  const [fullname, setFullname] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { accessToken, refreshAccessToken } = useCollectToken();
  const { showNotification, setShowNotification } = useShowNotification();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!accessToken) return;
        const res = await fetch(`${baseUrl}/manage-profile/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        });

        const { error, isTokenExpired, foundUser } = await res.json();
        const apiResult = handleApiResponse(res, error, isTokenExpired);

        // If Access Token has expired
        if (apiResult.retry) {
          const tokenValid = await refreshAccessToken();
          // If Refresh Token has expired
          if (!tokenValid.isValid) throw new Error(tokenValid.message);

          return fetchData();
        }

        setFullname(foundUser.fullname);
        setUsername(foundUser.username);
        setEmail(foundUser.email);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [accessToken]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submitData = async () => {
      try {
        if (!accessToken) throw new Error("Please Login First.");

        const res = await fetch(`${baseUrl}/manage-profile/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            fullname,
            username,
            oldPassword,
            newPassword,
          }),
        });

        const { error, isTokenExpired, message } = await res.json();
        const apiResult = handleApiResponse(res, error, isTokenExpired);

        if (apiResult.retry === true) {
          // If Sever say Access Token has expired
          // -> Refresh Access Token
          const tokenValid = await refreshAccessToken();
          if (!tokenValid.isValid) {
            throw new Error(tokenValid.message);
          }
          // If Refresh Token is Valid -> Retry Once
          return submitData();
        }

        setShowNotification({ type: "success", message });
      } catch (err) {
        setShowNotification({ type: "error", message: err.message });
      } finally {
        setIsSubmitting(false);
      }
    };

    submitData();
  };

  if (isLoading) return <MaxiPreLoader />;
  if (error) return <MaxiErrorCard errorMessage={error} />;

  if (!fullname && !username && !email)
    return (
      <>
        <LoginNotice />
      </>
    );

  if (fullname && username && email)
    return (
      <main>
        {showNotification && (
          <Notification
            type={showNotification.type}
            message={showNotification.message}
          />
        )}
        <section className="flex justify-center items-center w-full py-20">
          <div className="md:w-1/2 xl:w-1/4">
            <div className="flex justify-center items-center mb-4">
              <img
                src="../../../unknown.jpg"
                alt="Profile Image"
                className="rounded-full size-2/4"
              />
            </div>
            <h1 className="text-center font-bold text-3xl sm:text-4xl mb-5">
              Edit Profile
            </h1>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="flex gap-x-3 items-center mb-4">
                <label htmlFor="fullname">Fullname:</label>
                <input
                  type="text"
                  id="fullname"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="rounded-md bg-gray-700 py-3 px-5 text-gray-400 focus:text-gray-200 focus:shadow focus:shadow-primary focus:outline focus:outline-primary grow"
                  required
                />
              </div>
              <div className="flex gap-x-3 items-center mb-4">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-md bg-gray-700 py-3 px-5 text-gray-400 focus:text-gray-200 focus:shadow focus:shadow-primary focus:outline focus:outline-primary grow"
                  required
                />
              </div>
              <div className="flex gap-x-3 items-center mb-4">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  defaultValue={email}
                  className="w-full rounded-md bg-gray-700 py-3 px-5 text-gray-400 focus:text-gray-200 focus:shadow focus:shadow-primary focus:outline focus:outline-primary grow"
                  readOnly
                />
              </div>
              <div className="flex gap-x-3 items-center mb-4">
                <label htmlFor="old-password">Old Password:</label>
                <input
                  type="password"
                  id="old-password"
                  placeholder="Enter your previous password"
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full rounded-md bg-gray-700 py-3 px-5 text-gray-400 focus:text-gray-200 focus:shadow focus:shadow-primary focus:outline focus:outline-primary grow"
                  required
                />
              </div>
              <div className="flex gap-x-3 items-center mb-4">
                <label htmlFor="new-password">New Password:</label>
                <input
                  type="password"
                  id="new-password"
                  placeholder="Enter your new password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-md bg-gray-700 py-3 px-5 text-gray-400 focus:text-gray-200 focus:shadow focus:shadow-primary focus:outline focus:outline-primary grow"
                  required
                />
              </div>
              <div className="mb-4">
                <SubmitButton
                  text={isSubmitting ? "Loading..." : "Save Changes"}
                  isDisabled={isSubmitting}
                />
              </div>
            </form>
          </div>
        </section>
      </main>
    );
};

export default ManageProfile;
