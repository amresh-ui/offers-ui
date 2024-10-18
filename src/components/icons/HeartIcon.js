const HeartIcon = ({ color, isProductDetail }) => {

  if (isProductDetail) {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.99364 4.27985C8.32752 2.332 5.54914 1.80804 3.46159 3.59168C1.37405 5.37532 1.08016 8.35748 2.71951 10.467C4.08253 12.2209 8.20749 15.9201 9.55943 17.1174C9.71069 17.2513 9.78631 17.3183 9.87453 17.3446C9.95152 17.3676 10.0358 17.3676 10.1128 17.3446C10.201 17.3183 10.2766 17.2513 10.4279 17.1174C11.7798 15.9201 15.9048 12.2209 17.2678 10.467C18.9071 8.35748 18.6491 5.35656 16.5257 3.59168C14.4023 1.8268 11.6598 2.332 9.99364 4.27985Z"
          fill={color}
          stroke={color ? color : "#475467"}
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

    )
  } else {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.99511 3.42388C6.66221 1.8656 4.43951 1.44643 2.76947 2.87334C1.09944 4.30026 0.86432 6.68598 2.17581 8.3736C3.26622 9.77674 6.56619 12.7361 7.64774 13.6939C7.76874 13.801 7.82925 13.8546 7.89982 13.8757C7.96141 13.8941 8.02881 13.8941 8.0904 13.8757C8.16097 13.8546 8.22147 13.801 8.34248 13.6939C9.42403 12.7361 12.724 9.77674 13.8144 8.3736C15.1259 6.68598 14.9195 4.28525 13.2207 2.87334C11.522 1.46144 9.32801 1.8656 7.99511 3.42388Z"
          stroke={color ? color : "#475467"}
          fill={color}
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
};

export default HeartIcon;
