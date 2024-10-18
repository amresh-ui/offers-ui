import React, { useState, useEffect, useRef } from "react";
import ToastCloseIcon from "../icons/ToastCloseIcon";
import { CheckCircle } from "../icons";

const Toast = ({ message, duration = 3000, onClose }) => {
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef(null);
  const baseClasses =
    "flex items-center px-[10px] py-[11px] shadow-lg text-black bg-green-10 z-1 border border-green-10 rounded-lg ";

  useEffect(() => {
    if (message) {
      setShowToast(true);
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
      toastTimeoutRef.current = setTimeout(() => {
        setShowToast(false);
        if (onClose) onClose();
      }, duration);
    }
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, [message, duration, onClose]);

  return showToast ? (
    <div className={baseClasses}>
      <span className="mr-2.5">
        <CheckCircle />
      </span>
      <span className="text-base font-semibold font-public text-size-14 text-green-dark truncate mr-[8px]">
        {message}
      </span>
      <button
        className="ml-auto bg-transparent border-0 text-green-dark cursor-pointer"
        onClick={() => setShowToast(false)}
      >
        <ToastCloseIcon />
      </button>
    </div>
  ) : null;
};

export default Toast;
