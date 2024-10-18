import React from "react";

const Button = ({
  variant = "primary",
  size = "medium",
  onClick,
  disabled,
  children,
  className,
  ...props
}) => {
  let baseClasses =
    "font-bold py-2.5 px-4 rounded-xl transition ease-in-out duration-150 font-public";
  let variantClasses;
  let sizeClasses;

  switch (variant) {
    case "primary":
      variantClasses = "bg-button-primary-bg hover:bg-button-primary-bg text-white";
      break;
    case "secondary":
      variantClasses = "bg-secondary hover:bg-secondary text-secondary";
      break;
    case "success":
      variantClasses = "bg-green-10 hover:bg-green-10 text-white";
      break;
    case "warning":
      variantClasses = "bg-yellow-10 hover:bg-yellow-10 text-white";
      break;
    case "danger":
      variantClasses = "bg-red-10 hover:bg-red-10 text-white";
      break;
    case "link":
      variantClasses = "bg-white text-blue-10";
      break;
    default:
      variantClasses = "bg-blue-10 hover:bg-blue-10 text-white";
  }

  switch (size) {
    case "small":
      sizeClasses = "text-sm py-1 px-2";
      break;
    case "large":
      sizeClasses = "text-lg py-3 px-6";
      break;
    default:
      sizeClasses = "text-base py-2.5 px-4";
  }

  const disabledClasses = "bg-gray-disable text-button-disable-gray cursor-not-allowed";

  const classes = disabled
    ? `${baseClasses} ${disabledClasses}`
    : `${baseClasses} ${variantClasses} ${sizeClasses}`;

  return (
    <button
      className={`${classes} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
