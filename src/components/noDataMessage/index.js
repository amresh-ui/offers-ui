const NoDataMessage = ({ msg }) => {
  return (
    <div className="text-center w-full absolute top-1/2">
      <h3 className="text-base font-extrabold">{msg}</h3>
    </div>
  );
};

export default NoDataMessage;
