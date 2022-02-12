import React, { ReactElement, ReactNode } from "react";

type Horizontal = "start" | "end" | "center" | "between" | "around" | "evenly";
type Vertical = "start" | "end" | "center" | "baseline" | "stretch";

interface FlexProps {
  children: ReactNode | ReactNode[];
  horizontal?: Horizontal;
  vertical?: Vertical;
  className?: string;
  col?: boolean;
}

function getJustify(horizontal: Horizontal) {
  if (horizontal === "around") return "justify-around";
  if (horizontal === "between") return "justify-between";
  if (horizontal === "center") return "justify-center";
  if (horizontal === "end") return "justify-end";
  if (horizontal === "evenly") return "justify-evenly";
  return "justify-start";
}

function getItems(vertical: Vertical) {
  if (vertical === "baseline") return "items-baseline";
  if (vertical === "center") return "items-center";
  if (vertical === "end") return "items-end";
  if (vertical === "start") return "items-start";
  return "items-stretch";
}

export default function Flex({
  children,
  className,
  col,
  horizontal = "start",
  vertical = "center",
}: FlexProps): ReactElement {
  return (
    <div
      className={
        "flex " + 
        (col ? "flex-col " : "") +
        getJustify(horizontal) +
        " " +
        getItems(vertical) +
        (className ? " " + className : "")
      }
    >
      {children}
    </div>
  );
}