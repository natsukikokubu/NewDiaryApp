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
    <button onClick={onClick} {...rest}>
      {children}
    </button>
  );
};
