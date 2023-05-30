import React from "react";
interface IButton {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
  className?: string;
  type?: "submit" | "button";
}

const Button = ({ onClick, text, className, type }: IButton) => {
  return (
    <button
      type={type || "button"}
      className={`${className} p-2 border-[1px] border-[black]`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
