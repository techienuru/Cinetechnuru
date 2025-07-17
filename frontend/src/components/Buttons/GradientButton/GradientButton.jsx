const GradientButton = ({ text, title, handleOnClick }) => {
  return (
    <>
      <button
        type="button"
        className="btnGradient px-3 py-2 rounded-md cursor-pointer hover:shadow hover:shadow-primary hover:scale-105"
        title={title}
        onClick={handleOnClick}
      >
        {text}
      </button>
    </>
  );
};

export default GradientButton;
