"use client";

import React, { FC } from "react";

interface ButtonProps {
  label: React.ReactNode;
  action?: () => void;
  type?: string;
  className?: string;
}

let Button: FC<ButtonProps> = ({ label, action, type, className }) => {
  return (
    <button
      onClick={action}
      className={`home-btn ${
        type === "primary"
          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl"
          : type === "secondary"
          ? "bg-gradient-to-r from-transparent to-transparent text-white border-2 border-white/30 hover:border-white/60 backdrop-blur-sm hover:bg-white/10"
          : "bg-transparent text-white border border-white hover:bg-white/10"
      } ${className}`}
    >
      <span className="relative z-10">{label}</span>
    </button>
  );
};

export default Button;
