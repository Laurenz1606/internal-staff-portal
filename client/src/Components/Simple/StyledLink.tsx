import React, { MouseEventHandler, ReactElement } from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  children: string;
}

export default function StyledLink({
  children,
  to,
  onClick,
}: Props): ReactElement {
  return (
    <Link
      onClick={onClick}
      className="font-medium text-indigo-600 hover:text-indigo-500"
      to={to}
    >
      {children}
    </Link>
  );
}