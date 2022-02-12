import React, { ReactElement } from "react";

type BadgeColors =
  | "gray"
  | "red"
  | "yellow"
  | "green"
  | "blue"
  | "indigo"
  | "purple"
  | "pink";

type BadgeSizes = "sm" | "lg";

type BadgeRoundness = "normal" | "full";

interface Props {
  size?: BadgeSizes;
  text: string;
  roundness?: BadgeRoundness;
  color?: BadgeColors;
}

function generateColors(color: BadgeColors) {
  if (color === "gray") return "bg-gray-100 text-gray-800";
  if (color === "red") return "bg-red-100 text-red-800";
  if (color === "yellow") return "bg-yellow-100 text-yellow-800";
  if (color === "green") return "bg-green-100 text-green-800";
  if (color === "blue") return "bg-blue-100 text-blue-800";
  if (color === "indigo") return "bg-indigo-100 text-indigo-800";
  if (color === "purple") return "bg-purple-100 text-purple-800";
  if (color === "pink") return "bg-pink-100 text-pink-800";
}

function generatePadding(size: BadgeSizes, roundness: BadgeRoundness) {
  if (roundness === "normal") {
    if (size === "sm") return "px-2";
    if (size === "lg") return "px-2.5";
  }
  if (roundness === "full") {
    if (size === "sm") return "px-2.5";
    if (size === "lg") return "px-3";
  }
}

function generateTextSize(size: BadgeSizes) {
  if (size === "sm") return "text-xs";
  if (size === "lg") return "text-sm";
}

function generateRoundness(roundness: BadgeRoundness, size: BadgeSizes) {
  if (roundness === "normal") {
    if (size === "sm") return "rounded";
    if (size === "lg") return "rounded-md";
  }
  if (roundness === "full") {
    return "rounded-full";
  }
}

export default function Badge({
  size = "sm",
  text,
  roundness = "full",
  color = "indigo",
}: Props): ReactElement {
  return (
    <span
      className={`inline-flex items-center ${generatePadding(
        size,
        roundness,
      )} py-0.5 ${generateRoundness(roundness, size)} ${generateTextSize(
        size,
      )} font-medium ${generateColors(color)}`}
    >
      {text}
    </span>
  );
}