const BackButton = ({ text, title, onClick }) => {
  return (
    <>
      <button
        type="button"
        className="outline outline-amber-500 px-3 py-2 rounded-md cursor-pointer hover:bg-amber-500 hover:text-black"
        title={title}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};

export default BackButton;
