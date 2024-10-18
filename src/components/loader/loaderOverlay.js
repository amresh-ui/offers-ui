const LoaderOverlay = () => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="loader ease-linear rounded-full border-4 border-t-8 border-gray-300 h-12 w-12"></div>
    </div>
  );
};

export default LoaderOverlay;
