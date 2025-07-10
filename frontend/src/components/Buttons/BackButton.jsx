const BackButton = ({ text, title }) => {
  return (
    <>
      <button
        type="button"
        className="outline outline-amber-500 px-3 py-2 rounded-md cursor-pointer hover:bg-amber-500 hover:text-black"
        title={title}
      >
        {text}
      </button>
    </>
  );
};

export default BackButton;
