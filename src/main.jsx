import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Index from "./pages/index.jsx";
import "./styles/index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Index />
  </BrowserRouter>
);
