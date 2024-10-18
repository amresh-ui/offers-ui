const CardWrapper = ({ children, className, onClick }) => {
  return (
    <div
      className={`p-4 mx-4 mb-6 bg-white-100 shadow-shadow-small rounded-2xl ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default CardWrapper;
