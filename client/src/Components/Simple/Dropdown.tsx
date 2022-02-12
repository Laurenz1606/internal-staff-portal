import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import React, {
  FC,
  Fragment,
  MouseEventHandler,
  ReactElement,
  ReactNode,
} from "react";
import { Link } from "react-router-dom";

interface DropdownProps {
  children: ReactNode | ReactNode[];
}

interface DropdownButtonProps {
  children: ReactNode | ReactNode[] | string;
  border?: boolean;
}

interface DropdownContentProps extends DropdownProps {}

interface DropdownSectionProps extends DropdownProps {}

interface DropdownLinkProps {
  to: string;
  Icon?: FC<{ className: string }>;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  text: string;
}

interface DropdownInfoProps {
  smallText: string;
  largeText: string;
}

export default function Dropdown({ children }: DropdownProps): ReactElement {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {children}
    </Menu>
  );
}

Dropdown.Button = function ({
  children,
  border = true,
}: DropdownButtonProps): ReactElement {
  return (
    <div>
      <Menu.Button
        className={
          "inline-flex justify-center items-center w-full rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" +
          (border ? " border border-gray-300 shadow-sm" : "")
        }
      >
        <span className="inline-flex justify-center items-center space-x-3">
          {children}
        </span>
        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </Menu.Button>
    </div>
  );
};

Dropdown.Content = function ({ children }: DropdownContentProps): ReactElement {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
        {children}
      </Menu.Items>
    </Transition>
  );
};

Dropdown.Section = function ({ children }: DropdownSectionProps): ReactElement {
  return <div className="py-1">{children}</div>;
};

Dropdown.Link = function ({
  Icon,
  onClick,
  to,
  text,
}: DropdownLinkProps): ReactElement {
  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          to={to}
          onClick={onClick}
          className={
            (active ? "bg-gray-100 text-gray-900" : "text-gray-700") +
            " group flex items-center px-4 py-2 text-sm"
          }
        >
          {Icon ? (
            <Icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
          ) : (
            ""
          )}
          {text}
        </Link>
      )}
    </Menu.Item>
  );
};

Dropdown.Info = function ({
  smallText,
  largeText,
}: DropdownInfoProps): ReactElement {
  return (
    <div className="px-4 py-3">
      <p className="text-sm">{smallText}</p>
      <p className="text-sm font-medium text-gray-900 truncate">{largeText}</p>
    </div>
  );
};
