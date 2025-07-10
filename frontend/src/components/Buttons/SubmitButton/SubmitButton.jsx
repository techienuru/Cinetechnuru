const SubmitButton = ({ text }) => {
  return (
    <>
      <button
        type="button"
        className="btnGradient3 px-3 py-4 w-full rounded-xl cursor-pointer hover:shadow hover:shadow-primary hover:scale-105"
      >
        {text}
      </button>
    </>
  );
};

export default SubmitButton;
