const variantClasses = {
  info: "bg-blue-60 text-white",
  success: "bg-green-100 text-white",
  pending: "bg-yellow-10 text-black",
  warning: "bg-yellow-100 text-white",
  error: "bg-red-100 text-white",
  normal: "bg-purple-10 text-white",
  gray: "bg-gray-30 text-black-30",
  white: "bg-white-10 text-black-30 border border-gray-30",
};

const sizeClasses = {
  small: "px-2 py-1.5 text-xs",
  large: "px-4 py-2 text-base",
};

const Badge = ({ variant = "info", size = "small", children, onClick }) => {
  return (
    <span
      className={`rounded-[10px] font-medium ${variantClasses[variant]} ${sizeClasses[size]}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default Badge;
