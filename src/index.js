import React from "react";
import ReactDOM from "react-dom/client";
import "./main.scss";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {Context} from "./context/context";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LocalizationProvider>
  </Context>
);
