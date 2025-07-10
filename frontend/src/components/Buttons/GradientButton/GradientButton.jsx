const GradientButton = ({ text, title }) => {
  return (
    <>
      <button
        type="button"
        className="btnGradient px-3 py-2 rounded-md cursor-pointer hover:shadow hover:shadow-primary hover:scale-105"
        title={title}
      >
        {text}
      </button>
    </>
  );
};

export default GradientButton;
