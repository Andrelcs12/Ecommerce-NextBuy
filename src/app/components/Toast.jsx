// components/Toast.jsx
"use client";

import { XCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

const Toast = ({ id, message, type, onClose, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300); // Allow fade-out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [id, onClose, duration]);

  const baseClasses =
    "flex items-center justify-between p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out transform";
  const iconClasses = "mr-3";
  const messageClasses = "flex-1 text-sm font-medium";

  let bgColor, textColor, icon, borderColor;

  switch (type) {
    case "success":
      bgColor = "bg-green-50";
      textColor = "text-green-800";
      borderColor = "border-green-400";
      icon = <CheckCircle2 size={20} className="text-green-500" />;
      break;
    case "error":
      bgColor = "bg-red-50";
      textColor = "text-red-800";
      borderColor = "border-red-400";
      icon = <XCircle size={20} className="text-red-500" />;
      break;
    case "warning":
      bgColor = "bg-yellow-50";
      textColor = "text-yellow-800";
      borderColor = "border-yellow-400";
      icon = <AlertTriangle size={20} className="text-yellow-500" />;
      break;
    case "info":
    default:
      bgColor = "bg-blue-50";
      textColor = "text-blue-800";
      borderColor = "border-blue-400";
      icon = <Info size={20} className="text-blue-500" />;
      break;
  }

  return (
    <div
      className={`${baseClasses} ${bgColor} ${textColor} border ${borderColor} ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      } ${!isVisible ? "pointer-events-none" : ""}`}
      role="alert"
    >
      <div className={iconClasses}>{icon}</div>
      <div className={messageClasses}>{message}</div>
      <button onClick={() => setIsVisible(false)} className="ml-4 p-1 rounded-full cursor-pointer hover:bg-gray-200">
        <XCircle size={16} className={`text-gray-500 ${textColor}`} />
      </button>
    </div>
  );
};

export default Toast;