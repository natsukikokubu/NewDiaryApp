import { ButtonHTMLAttributes, ComponentProps } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "small" | "medium" | "large";
};

export const Button = ({
  children,
  onClick,
  size = "medium",
  ...rest
}: Props) => {
  const sizeClass = {
    small: "btn-small",
    medium: "btn-medium",
    large: "btn-large",
  };
  return (
    <button
      className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full"
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};
