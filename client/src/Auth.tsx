import {
  FetchFunction,
  LoggedInFunction,
  LoginFunction,
  LogoutFunction,
  useFetch,
  useLoggedIn,
  useLogin,
  useLogout,
} from "@authfunctions/react";
import React, { createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode | ReactNode[];
}

export interface IAuthFunctions {
  login: LoginFunction;
  logout: LogoutFunction;
  fetch: FetchFunction;
  loggedIn: LoggedInFunction;
}

export const authContext = createContext<IAuthFunctions>({
  login: async () => ({ err: true, code: 5, nav: () => null }),
  logout: async () => ({ err: true, code: 5, nav: () => null }),
  fetch: async () => ({
    auth: { code: 5, err: true },
    data: null,
    err: true,
    nav: () => "",
    res: new Response(),
  }),
  loggedIn: async () => false,
});

export default function Auth({ children }: Props) {
  //the initial navigator
  const naviator = useNavigate();

  //all auth methods
  const auth: IAuthFunctions = {
    fetch: useFetch(naviator),
    loggedIn: useLoggedIn(naviator),
    login: useLogin(naviator),
    logout: useLogout(naviator),
  };
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
