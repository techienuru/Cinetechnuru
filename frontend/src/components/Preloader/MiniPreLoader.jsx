const MiniPreLoader = () => {
  return (
    <div className="w-full h-80 relative my-5">
      <div class="bodyGradient absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <img
          src="../../../favicon.webp"
          width="40"
          height="40"
          alt="Logo"
          className="animatePreLoader"
        />
      </div>
    </div>
  );
};

export default MiniPreLoader;
