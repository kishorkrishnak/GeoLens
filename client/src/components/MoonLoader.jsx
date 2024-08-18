const MoonLoader = () => {
  return (
    <div
      style={{
        zIndex: 1000000,
      }}
      className="fixed top-0 bottom-0 left-0 right-0 m-auto w-16 h-16 border-[6px] text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-500 rounded-full"
    ></div>
  );
};

export default MoonLoader;
