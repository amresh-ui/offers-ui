const OfferBackground = ({ className }) => {
  return (
    <div className="w-full h-full resize absolute -z-10">
      <svg
        width="390"
        height="460"
        viewBox="0 0 390 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M0 6.10352e-05H390V450.82C390 450.82 341 430.164 191 450.82C41 471.476 0 450.82 0 450.82V6.10352e-05Z"
          fill="url(#paint0_linear_10696_13926)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_10696_13926"
            x1="195"
            y1="253"
            x2="195"
            y2="598"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#1057BB" />
            <stop offset="1" stop-color="#ECECEC" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
export default OfferBackground;
