const EmptyDataNotice = ({ text1, text2, icon }) => {
  return (
    <section className="h-[80vh] flex justify-center items-center">
      <div className="text-center text-secondary border border-primary rounded-md p-5 shadow-md shadow-primary">
        <p className="text-lg">
          ❗ {text1} {icon} 😉
        </p>
        <p className="text-lg"> {text2}</p>
      </div>
    </section>
  );
};

export default EmptyDataNotice;
