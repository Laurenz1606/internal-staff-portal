import {
  BellIcon,
  CalendarIcon,
  ChartSquareBarIcon,
  ClipboardCheckIcon,
  ClipboardListIcon,
  DatabaseIcon,
  DocumentTextIcon,
  HomeIcon,
  LogoutIcon,
  MailIcon,
} from "@heroicons/react/outline";
import { CogIcon, UserIcon } from "@heroicons/react/solid";
import React, {
  Dispatch,
  FC,
  ReactElement,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authContext } from "../Auth";
import Dropdown from "../Components/Simple/Dropdown";
import Navbar from "../Components/Simple/Navbar";
import Sidebar, { DesktopOrMobile } from "../Components/Simple/Sidebar";

interface SideBarLayoutProps {
  children: ReactNode | ReactNode[];
}

interface SideBarContentProps {
  sidebarCurrent: string;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  type: DesktopOrMobile;
}

interface Link {
  Icon: FC;
  name: string;
  to: string;
  notifications?: number;
}

interface SecondaryLink {
  name: string;
  to: string;
}

const Navigation: Link[] = [
  {
    Icon: HomeIcon,
    name: "Dashboard",
    to: "/",
  },
  {
    Icon: MailIcon,
    name: "E-Mails",
    to: "/mails",
    notifications: 4,
  },
  {
    Icon: ChartSquareBarIcon,
    name: "Provision",
    to: "/provision",
  },
  {
    Icon: ClipboardCheckIcon,
    name: "Aufgaben",
    to: "/tasks",
    notifications: 44,
  },
  {
    Icon: CalendarIcon,
    name: "Kalender",
    to: "/calendar",
  },
  {
    Icon: DocumentTextIcon,
    name: "Dokumente",
    to: "/documents",
  },
  {
    Icon: DatabaseIcon,
    name: "Alt-IT Datenbanken",
    to: "/alt-it",
  },
  {
    Icon: ClipboardListIcon,
    name: "Sammelwettbewerb",
    to: "/sammelwettbewerb",
  },
];

const SecondaryNavigation: SecondaryLink[] = [
  {
    name: "Test",
    to: "/test",
  },
];

interface IUserData {
  username: string;
  email: string;
  _id: string;
}

const userDataDefault: IUserData = {
  username: "Loading...",
  email: "Loading...",
  _id: "Loading...",
};

export interface IUserContext {
  user: IUserData;
  reload: () => void;
}

export const UserContext = React.createContext<IUserContext>({
  user: userDataDefault,
  reload: () => {},
});

export default function SidebarLayout({
  children,
}: SideBarLayoutProps): ReactElement {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(userDataDefault);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCurrent, setSidebarCurrent] = useState("");
  const [search, setSearch] = useState("");

  const { fetch, logout } = useContext(authContext);

  async function onLogout() {
    const { nav } = await logout();
    return nav();
  }

  const loadUserData = useCallback(async () => {
    const { data, err, nav } = await fetch<IUserData>("/users", "GET");

    if (err) return nav();

    setUserData(data || userDataDefault);
  }, [fetch]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  useEffect(() => {
    setSidebarCurrent("/" + location.pathname.split("/")[1]);
  }, [location, setSidebarCurrent]);

  return (
    <UserContext.Provider value={{ user: userData, reload: loadUserData }}>
      <Sidebar>
        <Sidebar.Mobile
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        >
          <SideBarContent
            sidebarCurrent={sidebarCurrent}
            setSidebarOpen={setSidebarOpen}
            type="mobile"
          />
        </Sidebar.Mobile>
        <Sidebar.Desktop>
          <SideBarContent
            sidebarCurrent={sidebarCurrent}
            setSidebarOpen={setSidebarOpen}
            type="desktop"
          />
        </Sidebar.Desktop>
        <Sidebar.Content>
          <Navbar>
            <Navbar.SidebarButton setSidebarOpen={setSidebarOpen} />
            <Navbar.ContentWrapper1>
              <Navbar.Searchbar
                search={search}
                setSearch={setSearch}
                onSubmit={() => {}}
              />
              <Navbar.ContentWrapper2>
                <div className="z-30">
                  <Navbar.IconButton
                    Icon={BellIcon}
                    onClick={() => navigate("/notifications")}
                  />
                </div>
                <Dropdown>
                  <Dropdown.Button border={false}>
                    <span className="hidden lg:block">{userData.username}</span>
                  </Dropdown.Button>
                  <Dropdown.Content>
                    <Dropdown.Info
                      largeText={userData.email}
                      smallText="Angemeldet als"
                    />
                    <Dropdown.Section>
                      <Dropdown.Link
                        Icon={UserIcon}
                        text="Mein Profil"
                        to="/profile"
                      />
                      <Dropdown.Link
                        Icon={CogIcon}
                        text="Einstellungen"
                        to="/settings"
                      />
                    </Dropdown.Section>
                    <Dropdown.Section>
                      <Dropdown.Link
                        Icon={LogoutIcon}
                        text="Logout"
                        to=""
                        onClick={onLogout}
                      />
                    </Dropdown.Section>
                  </Dropdown.Content>
                </Dropdown>
              </Navbar.ContentWrapper2>
            </Navbar.ContentWrapper1>
          </Navbar>
          <>{children}</>
        </Sidebar.Content>
      </Sidebar>
    </UserContext.Provider>
  );
}

function SideBarContent({
  type,
  setSidebarOpen,
  sidebarCurrent,
}: SideBarContentProps) {
  return (
    <>
      <Sidebar.Header>
        <Sidebar.HeaderText text="mk:return ISP" />
      </Sidebar.Header>
      <Sidebar.Navigation type={type}>
        <Sidebar.Links>
          {Navigation.map((item, idx) => (
            <Sidebar.Link
              key={idx}
              setSidebarOpen={setSidebarOpen}
              Icon={item.Icon}
              name={item.name}
              to={item.to}
              current={sidebarCurrent === item.to}
              type={type}
              notifications={item.notifications}
            />
          ))}
        </Sidebar.Links>
        <Sidebar.SecondaryLinks title="Secondary">
          {SecondaryNavigation.map((item, idx) => (
            <Sidebar.SecondaryLink
              key={idx}
              setSidebarOpen={setSidebarOpen}
              name={item.name}
              to={item.to}
              type={type}
            />
          ))}
        </Sidebar.SecondaryLinks>
      </Sidebar.Navigation>
    </>
  );
}
