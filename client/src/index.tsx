import { setConfig } from "@authfunctions/react";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./Router";

setConfig(
  process.env.REACT_APP_API_URL || "",
  process.env.REACT_APP_AUTH_URL || "",
);

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById("root"),
);
