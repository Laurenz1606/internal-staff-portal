import { MenuAlt2Icon, SearchIcon } from "@heroicons/react/solid";
import React, {
  Dispatch,
  FC,
  FormEventHandler,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  SetStateAction,
} from "react";

interface NavbarProps {
  children: ReactNode | ReactNode[];
}

interface NavbarSidebarButtonProps {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

interface NavbarContentWrapper1Props extends NavbarProps {}

interface NavbarContentWrapper2Props extends NavbarProps {}

interface NavbarSearchbarProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

interface NavbarIconButtonProps {
  Icon: FC<{ className: string }>;
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function Navbar({ children }: NavbarProps): ReactElement {
  return (
    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
      {children}
    </div>
  );
}

Navbar.SidebarButton = function ({ setSidebarOpen }: NavbarSidebarButtonProps) {
  return (
    <button
      type="button"
      className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
      onClick={() => setSidebarOpen(true)}
    >
      <span className="sr-only">Open sidebar</span>
      <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
};

Navbar.ContentWrapper1 = function ({ children }: NavbarContentWrapper1Props) {
  return <div className="flex-1 px-4 flex justify-between">{children}</div>;
};

Navbar.ContentWrapper2 = function ({ children }: NavbarContentWrapper2Props) {
  return <div className="flex items-center md:ml-6 space-x-3">{children}</div>;
};

Navbar.Searchbar = function ({
  onSubmit,
  search,
  setSearch,
}: NavbarSearchbarProps) {
  return (
    <div className="flex-1 flex">
      <form
        className="w-full flex md:ml-0"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("test");
          onSubmit(e);
        }}
      >
        <label htmlFor="search-field" className="sr-only">
          Search
        </label>
        <div className="relative w-full text-gray-400 focus-within:text-gray-600">
          <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          <input
            id="search-field"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
            placeholder="Search"
            type="search"
            name="search"
          />
        </div>
      </form>
    </div>
  );
};

Navbar.IconButton = function ({ Icon, onClick }: NavbarIconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <Icon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
};