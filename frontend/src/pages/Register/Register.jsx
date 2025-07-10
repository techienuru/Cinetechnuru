import { Link } from "react-router-dom";
import SubmitButton from "../../components/Buttons/SubmitButton/SubmitButton";

const Register = () => {
  return (
    <main>
      <section className="flex justify-center items-center w-full h-[100vh]">
        <div className="w-1/4">
          <h1 className="text-center font-bold text-3xl sm:text-4xl mb-5">
            Sign Up
          </h1>
          <form>
            <div className="mb-4">
              <input
                type="text"
                id="fullname"
                placeholder="Fullname"
                className="w-full rounded-md bg-gray-700 py-3 px-5 focus:shadow focus:shadow-primary focus:outline focus:outline-primary"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="w-full rounded-md bg-gray-700 py-3 px-5 focus:shadow focus:shadow-primary focus:outline focus:outline-primary"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                placeholder="Email address"
                className="w-full rounded-md bg-gray-700 py-3 px-5 focus:shadow focus:shadow-primary focus:outline focus:outline-primary"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full rounded-md bg-gray-700 py-3 px-5 focus:shadow focus:shadow-primary focus:outline focus:outline-primary"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="cpassword"
                placeholder="Confirm Password"
                className="w-full rounded-md bg-gray-700 py-3 px-5 focus:shadow focus:shadow-primary focus:outline focus:outline-primary"
                required
              />
            </div>
            <div className="mb-4">
              <SubmitButton text="Create Account" />
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
  );
};

export default Register;
