import { Link } from "react-router-dom";
import GradientButton from "../../components/Buttons/GradientButton/GradientButton";

const NotFound = () => {
  return (
    <>
      <main>
        <section className="min-h-dvh flex justify-center items-center">
          <div className="text-center *:mb-4">
            <h1 className="text-3xl">404</h1>
            <h1 className="text-2xl">Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="/">
              <GradientButton text="Back To Home" title="Back to Homepage" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default NotFound;
