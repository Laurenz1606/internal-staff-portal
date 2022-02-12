import React, { ReactElement } from "react";

interface Props {
  size?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  text: string;
}

export default function Heading({ size = "h1", text }: Props): ReactElement {
  if (size === "h1")
    return <h1 className="text-3xl font-extrabold text-gray-900">{text}</h1>;
  if (size === "h2")
    return <h2 className="text-2xl font-bold text-gray-900">{text}</h2>;
  if (size === "h3")
    return <h3 className="text-xl font-bold text-gray-900">{text}</h3>;
  if (size === "h4")
    return <h4 className="text-lg font-bold text-gray-900">{text}</h4>;
  if (size === "h5")
    return <h5 className="text-base font-bold text-gray-900">{text}</h5>;
  return <h6 className="text-sm font-semibold text-gray-900">{text}</h6>;
}
