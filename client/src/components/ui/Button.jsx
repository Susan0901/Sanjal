import React from "react";

const Button = ({ type = "submit", children, className }) => {
  return (
    <button type={type} className={`p-3 bg-green-500 text-white rounded-lg cursor-pointer ${className}`}>
      {children}
    </button>
  );
};

export default Button;
