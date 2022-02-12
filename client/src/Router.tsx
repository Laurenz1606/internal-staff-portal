import { Guard } from "@authfunctions/react";
import React from "react";
import {
  BrowserRouter,
  IndexRouteProps,
  Navigate,
  Outlet,
  PathRouteProps,
  Route,
  Routes,
} from "react-router-dom";
import Auth from "./Auth";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";

type TRoute = IndexRouteProps | PathRouteProps;

const routes: TRoute[] = [{ index: true, element: <Dashboard /> }];
const redirects: { from: string; to: string }[] = [
  { from: "/dashboard", to: "/" },
];

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Auth>
              <Outlet />
            </Auth>
          }
        >
          {redirects.map(({ from, to }, idx) => (
            <Route path={from} element={<Navigate to={to} />} key={idx} />
          ))}
          <Route
            path="/login"
            element={
              <Guard type="LoggedOutOnly">
                <Login />
              </Guard>
            }
          />
          <Route
            path="/"
            element={
              <Guard type="LoggedInOnly">
                <Outlet />
              </Guard>
            }
          >
            {routes.map((route, idx) => (
              <Route {...route} key={idx} />
            ))}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
