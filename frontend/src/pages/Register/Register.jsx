import { Link } from "react-router-dom";
import SubmitButton from "../../components/Buttons/SubmitButton/SubmitButton";
import { useState } from "react";
import { baseUrl } from "../../config";
import Notification from "../../components/Notification/Notification";
import useShowNotification from "../../Hooks/useShowNotification";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { showNotification, setShowNotification } = useShowNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const res = await fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          username,
          email,
          password,
          cPassword,
        }),
      });
      const data = await res.json();
      if (data?.error) throw new Error(data.error);

      setShowNotification({ type: "success", message: data.message });
    } catch (err) {
      setShowNotification({ type: "error", message: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {showNotification && (
        <Notification
          type={showNotification.type}
          message={showNotification.message}
        />
      )}
      <main>
        <section className="flex justify-center items-center w-full h-[100vh]">
          <div className="w-1/4">
            <h1 className="text-center font-bold text-3xl sm:text-4xl mb-5">
              Sign Up
            </h1>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-4">
                <input
                  type="text"
                  id="fullname"
                  placeholder="Fullname"
                  className="w-full rounded-md bg-gray-700 py-3 px-5 focus:shadow focus:shadow-primary focus:outline focus:outline-primary"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value.trim())}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  className="w-full rounded-md bg-gray-700 py-3 px-5 focus:shadow focus:shadow-primary focus:outline focus:outline-primary"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.trim())}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  placeholder="Email address"
                  className="w-full rounded-md bg-gray-700 py-3 px-5 focus:shadow focus:shadow-primary focus:outline focus:outline-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
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
                  onChange={(e) => setPassword(e.target.value.trim())}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  id="cpassword"
                  placeholder="Confirm Password"
                  className="w-full rounded-md bg-gray-700 py-3 px-5 focus:shadow focus:shadow-primary focus:outline focus:outline-primary"
                  value={cPassword}
                  onChange={(e) => setCPassword(e.target.value.trim())}
                  required
                />
              </div>
              <div className="mb-4">
                {isSubmitting ? (
                  <SubmitButton text="Loading..." isDisabled={true} />
                ) : (
                  <SubmitButton text="Create Account" />
                )}
              </div>
              <p className="text-end">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="text-primary text-shadow-2xs text-shadow-primary  hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default Register;
