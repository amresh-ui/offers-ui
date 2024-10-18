const DetailCell = ({ title, desc }) => {
  return (
    <div>
      <span className="font-semibold mr-1.5">{title}:</span>
      <span>{desc}</span>
    </div>
  );
};

export default DetailCell;
