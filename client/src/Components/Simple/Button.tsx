import React, {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactElement,
} from "react";

type ButtonSizes = "xs" | "sm" | "md" | "lg" | "xl";
type ButtonColors = "primary" | "secondary" | "white";

interface Props {
  size?: ButtonSizes;
  children: string;
  color?: ButtonColors;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  stretch?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export default function Button({
  children,
  color = "primary",
  onClick,
  size = "md",
  stretch = false,
  type,
}: Props): ReactElement {
  return (
    <button
      type={type}
      className={
        (stretch ? "w-full text-center" : "") +
        "inline-flex items-center " +
        (size === "xs"
          ? "px-2.5 py-1.5 text-xs rounded"
          : size === "sm"
          ? "px-3 py-2 text-sm leading-4 rounded-md"
          : size === "md"
          ? "px-4 py-2 text-sm rounded-md"
          : size === "lg"
          ? "px-4 py-2 text-base rounded-md"
          : "px-6 py-3 text-base rounded-md") +
        " border font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 " +
        (color === "primary"
          ? "border-transparent shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          : color === "secondary"
          ? "border-transparent text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
          : "border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-50")
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}
