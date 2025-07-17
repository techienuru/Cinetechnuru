import { Link, useNavigate } from "react-router-dom";
import SubmitButton from "../../components/Buttons/SubmitButton/SubmitButton";
import { useState } from "react";
import useShowNotification from "../../Hooks/useShowNotification";
import { baseUrl } from "../../config";
import Notification from "../../components/Notification/Notification";
import useCollectToken from "../../Hooks/useCollectToken";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { showNotification, setShowNotification } = useShowNotification();
  const { saveAccessToken } = useCollectToken();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const res = await fetch(`${baseUrl}/auth/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data?.error) throw new Error(data.error);

      saveAccessToken(data.accessToken);
      setShowNotification({ type: "success", message: data.message });

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setShowNotification({ type: "error", message: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <>
        {showNotification && (
          <Notification
            type={showNotification.type}
            message={showNotification.message}
          />
        )}
        <section className="flex justify-center items-center w-full h-[100vh]">
          <div className="w-1/4">
            <h1 className="text-center font-bold text-3xl sm:text-4xl mb-5">
              Login
            </h1>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  placeholder="Email address"
                  className="w-full rounded-md bg-gray-700 py-3 px-5 focus:shadow focus:shadow-primary focus:outline focus:outline-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="w-full rounded-md bg-gray-700 py-3 px-5 focus:shadow focus:shadow-primary focus:outline focus:outline-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                {isSubmitting ? (
                  <SubmitButton text="Loading.." isDisabled={true} />
                ) : (
                  <SubmitButton text="Login" />
                )}
              </div>
              <p className="text-end">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary text-shadow-2xs text-shadow-primary  hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </section>
      </>
    </main>
  );
};

export default Login;
