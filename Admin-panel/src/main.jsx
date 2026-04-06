import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import axios from "axios";

// 🔥 GLOBAL CONFIG: Ensure Admin talks to the correct server
axios.defaults.baseURL = "https://api.sdtour.online";
axios.defaults.timeout = 10000;

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
