import AltImage from "../../assets/alt-img.png";

const Image = ({ className, src, alt, style, onClick }) => {
  return (
    <img
      className={`object-cover ${className}`}
      src={src}
      alt={alt}
      onError={(e) => {
        e.target.src = AltImage;
      }}
      style={style}
      onClick={onClick}
    />
  );
};
export default Image;
