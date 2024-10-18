const FavoriteIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || 27}
      height={props.height || 25}
      fill="none"
      {...props}
    >
      <path
        stroke={props.color || "#3E3E3E"}
        d="M13.024 1.082a.5.5 0 0 1 .952 0l2.304 7.092a1.5 1.5 0 0 0 1.426 1.036h7.458a.5.5 0 0 1 .294.905l-6.033 4.383a1.5 1.5 0 0 0-.545 1.677l2.304 7.092a.5.5 0 0 1-.77.56l-6.032-4.384a1.5 1.5 0 0 0-1.764 0l-6.033 4.383a.5.5 0 0 1-.77-.559l2.305-7.092a1.5 1.5 0 0 0-.545-1.677l-6.033-4.383a.5.5 0 0 1 .294-.905h7.457a1.5 1.5 0 0 0 1.427-1.036l2.304-7.092Z"
      />
    </svg>
  );
};
export default FavoriteIcon;
