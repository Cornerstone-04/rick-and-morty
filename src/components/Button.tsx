"use client";

import React, { FC } from "react";

type ButtonProps = {
  label: string;
  action?: () => void;
  type: string;
};

let Button: FC<ButtonProps> = ({ label, action, type }) => {
  return (
    <button
      onClick={action}
      className={`home-btn ${
        type === "primary"
          ? "bg-primary text-white"
          : "bg-transparent text-white border border-white"
      }`}
    >
      <span>{label}</span>
    </button>
  );
};

export default Button;
