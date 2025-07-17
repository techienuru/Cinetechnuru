import { Link } from "react-router-dom";

const MaxiErrorCard = ({ errorMessage }) => {
  return (
    <div className="bg-tertiary fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <article>
        <p>{errorMessage}</p>
        <div className="mt-4 flex justify-center gap-x-3">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-all cursor-pointer"
            title="Reload page"
          >
            Retry
          </button>
          <Link to={"/"}>
            <button
              className="px-4 py-2 btnGradient rounded cursor-pointer"
              title="Back to Homepage"
            >
              Go Home
            </button>
          </Link>
        </div>
      </article>
    </div>
  );
};

export default MaxiErrorCard;
