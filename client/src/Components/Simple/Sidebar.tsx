import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import React, {
  Dispatch,
  FC,
  Fragment,
  ReactElement,
  ReactNode,
  SetStateAction,
} from "react";
import { Link } from "react-router-dom";
import Badge from "./Badge";

export type DesktopOrMobile = "desktop" | "mobile";

interface SidebarProps {
  children: ReactNode | ReactNode[];
}

interface SidebarDesktopProps extends SidebarProps {}

interface SidebarMobileProps extends SidebarProps {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  sidebarOpen: boolean;
}

interface SidebarNavigationProps extends SidebarProps {
  type: DesktopOrMobile;
}

interface SidebarHeaderProps extends SidebarProps {}

interface SidebarHeaderTextProps {
  text: string;
}

interface SidebarHeaderImageProps {
  alt: string;
  url: string;
}

interface SidebarLinksProps extends SidebarProps {}

interface SidebarLinkProps {
  current: boolean;
  Icon: FC<{ className?: string }>;
  name: string;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  to: string;
  type: DesktopOrMobile;
  notifications?: number;
}

interface SidebarSecondaryLinksProps extends SidebarProps {
  title: string;
}

interface SidebarSecondaryLinkProps {
  name: string;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  to: string;
  type: DesktopOrMobile;
}

interface SidebarContentProps extends SidebarProps {}

export default function Sidebar({ children }: SidebarProps): ReactElement {
  return <div className="min-h-full">{children}</div>;
}

Sidebar.Desktop = function ({ children }: SidebarDesktopProps) {
  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
      <div className="flex flex-col flex-grow bg-indigo-700 pt-5 pb-4 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

Sidebar.Mobile = function ({
  children,
  sidebarOpen,
  setSidebarOpen,
}: SidebarMobileProps) {
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex z-40 lg:hidden"
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-indigo-700">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            {children}
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition.Root>
  );
};

Sidebar.Navigation = function ({ children, type }: SidebarNavigationProps) {
  return (
    <nav
      className={
        "mt-5 overflow-y-auto " +
        (type === "desktop" ? "flex-1 flex flex-col" : "flex-shrink-0 h-full")
      }
      aria-label="Sidebar"
    >
      {children}
    </nav>
  );
};

Sidebar.Header = function ({ children }: SidebarHeaderProps) {
  return <div className="flex items-center flex-shrink-0 px-4">{children}</div>;
};

Sidebar.HeaderText = function ({ text }: SidebarHeaderTextProps) {
  return (
    <div className="flex flex-1 justify-center">
      <Link to="/">
        <h1 className="text-indigo-100 text-2xl font-medium">{text}</h1>
      </Link>
    </div>
  );
};

Sidebar.HeaderImage = function ({ alt, url }: SidebarHeaderImageProps) {
  return <img className="h-8 w-auto" src={url} alt={alt} />;
};

Sidebar.Links = function ({ children }: SidebarLinksProps) {
  return <div className="px-2 space-y-1">{children}</div>;
};

Sidebar.Link = function ({
  current,
  Icon,
  name,
  to,
  type,
  setSidebarOpen,
  notifications,
}: SidebarLinkProps) {
  return (
    <Link
      onClick={() => setSidebarOpen(false)}
      to={to}
      className={
        (current
          ? "bg-indigo-800 text-white"
          : "text-indigo-100 hover:text-white hover:bg-indigo-600") +
        " group flex items-center px-2 py-2 leading-6 font-medium rounded-md justify-between " +
        (type === "desktop" ? "text-sm" : "text-base")
      }
      aria-current={current ? "page" : undefined}
    >
      <div className="flex">
        <Icon className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-200" />
        {name}
      </div>
      {notifications ? <Badge text={String(notifications)} /> : ""}
    </Link>
  );
};

Sidebar.SecondaryLinks = function ({
  children,
  title,
}: SidebarSecondaryLinksProps) {
  return (
    <div className="mt-8 px-2">
      <h3 className="px-3 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
        {title}
      </h3>
      <div className="mt-1 space-y-1" role="group">
        {children}
      </div>
    </div>
  );
};

Sidebar.SecondaryLink = function ({
  name,
  to,
  type,
  setSidebarOpen,
}: SidebarSecondaryLinkProps) {
  return (
    <Link
      onClick={() => setSidebarOpen(false)}
      to={to}
      className={
        "group flex items-center px-3 py-2 font-medium text-indigo-100 rounded-md hover:text-indigo-200 hover:bg-indigo-600 " +
        (type === "desktop" ? "text-sm" : "text-base leading-5")
      }
    >
      <span className="truncate">{name}</span>
    </Link>
  );
};

Sidebar.Content = function ({ children }: SidebarContentProps) {
  return <div className="lg:pl-64 flex flex-col flex-1">{children}</div>;
};