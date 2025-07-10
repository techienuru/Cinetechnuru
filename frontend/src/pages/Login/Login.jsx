import { Link } from "react-router-dom";
import SubmitButton from "../../components/Buttons/SubmitButton/SubmitButton";

const Login = () => {
  return (
    <main>
      <section className="flex justify-center items-center w-full h-[100vh]">
        <div className="w-1/4">
          <h1 className="text-center font-bold text-3xl sm:text-4xl mb-5">
            Login
          </h1>
          <form>
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
              <SubmitButton text="Login" />
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
    </main>
  );
};

export default Login;
