const SubmitButton = ({ text, isDisabled }) => {
  return (
    <>
      <button
        type="submit"
        className={`btnGradient3 px-3 py-4 w-full rounded-xl ${
          isDisabled ? "cursor-no-drop" : "cursor-pointer"
        }  hover:shadow hover:shadow-primary hover:scale-105`}
        disabled={isDisabled}
      >
        {text}
      </button>
    </>
  );
};

export default SubmitButton;
