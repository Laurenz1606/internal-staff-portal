import { Guard } from "@authfunctions/react";
import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <Guard type="LoggedOutOnly">
              <>Hallo</>
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
          <Route element={<>Dashboard</>} index />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
