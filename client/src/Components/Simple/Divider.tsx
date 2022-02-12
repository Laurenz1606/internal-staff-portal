import React, { ReactElement } from "react";

interface Props {
  text?: string;
  align?: "left" | "middle" | "right";
  type?: "title" | "label";
}

export default function Divider({
  text,
  align = "middle",
  type = "label",
}: Props): ReactElement {
  return (
    <div className="flex flex-row justify-center items-center">
      {align === "right" || align === "middle" ? <DividerLine /> : ""}
      {align === "right" ? <DividerLine /> : ""}
      <span
        className={
          type === "label"
            ? "px-2 text-gray-500 text-sm"
            : "px-3 text-lg font-medium text-gray-900"
        }
      >
        {text}
      </span>
      {align === "left" ? <DividerLine /> : ""}
      {align === "left" || align === "middle" ? <DividerLine /> : ""}
    </div>
  );
}

function DividerLine(): ReactElement {
  return <div className="flex-1 border-b border-gray-300"></div>;
}