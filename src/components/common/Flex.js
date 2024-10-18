const Flex = ({ className, children, onClick, ref }) => {
  return (
    <div
      className={`flex items-stretch flex-nowrap gap-4 justify-normal content-normal ${className}`}
      onClick={onClick}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default Flex;
