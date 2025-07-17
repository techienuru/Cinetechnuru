import { useNavigate } from "react-router-dom";

const MiniErrorCard = ({ errorMessage }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-80 relative my-5">
      <div className="bg-tertiary absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <article>
          <p>{errorMessage}</p>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => navigate(0)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-all"
              title="Reload page"
            >
              Retry
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default MiniErrorCard;
