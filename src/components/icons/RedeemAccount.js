const AccountRedeemIcon = ({isDisabled}) => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="link-external-01">
        <path
          id="Icon"
          d="M18 7.5L18 2.5M18 2.5H13M18 2.5L11.3333 9.16667M8.83333 4.16667H7C5.59987 4.16667 4.8998 4.16667 4.36502 4.43915C3.89462 4.67883 3.51217 5.06129 3.27248 5.53169C3 6.06647 3 6.76654 3 8.16667V13.5C3 14.9001 3 15.6002 3.27248 16.135C3.51217 16.6054 3.89462 16.9878 4.36502 17.2275C4.8998 17.5 5.59987 17.5 7 17.5H12.3333C13.7335 17.5 14.4335 17.5 14.9683 17.2275C15.4387 16.9878 15.8212 16.6054 16.0608 16.135C16.3333 15.6002 16.3333 14.9001 16.3333 13.5V11.6667"
          stroke={isDisabled ? "#98A2B3" : '#FFF'}
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );
};

export default AccountRedeemIcon;
