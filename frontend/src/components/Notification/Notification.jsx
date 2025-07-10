const Notification = ({ message, type }) => {
  const bgColor = type === "error" ? "bg-red-400" : "bg-teal-400";

  return (
    <article className="fixed top-0 right-0">
      <div
        className={`${bgColor} px-3 py-2 rounded-lg me-2 mt-2 text-amber-100`}
      >
        <p>{message}</p>
      </div>
    </article>
  );
};

export default Notification;
