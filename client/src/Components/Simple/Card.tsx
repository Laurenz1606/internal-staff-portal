import React, { ReactElement, ReactNode } from "react";

interface Props {
  children?: ReactNode | ReactNode[];
}

export default function Card({
  children,
  roundedOnMobile = false,
  className,
}: Props & { roundedOnMobile?: boolean; className?: string }): ReactElement {
  return (
    <div
      className={
        "bg-white overflow-hidden shadow divide-y divide-gray-200 flex flex-col " +
        (!roundedOnMobile ? "sm:rounded-lg" : "rounded-lg") +
        " " +
        className
      }
    >
      {children}
    </div>
  );
}

Card.Header = function ({ children }: Props): ReactElement {
  return <div className="px-4 py-5 sm:px-6">{children}</div>;
};

Card.Body = function ({
  children,
  noPadding = false,
}: Props & { noPadding?: boolean }): ReactElement {
  return (
    <div className={(noPadding ? "" : "px-4 py-5 sm:p-6 ") + "flex-1"}>
      {children}
    </div>
  );
};

Card.Footer = function ({ children }: Props): ReactElement {
  return <div className="px-4 py-4 sm:px-6">{children}</div>;
};