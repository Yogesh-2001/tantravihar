import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { ProfileContextProvider } from "./context/ProfileDetailsContext";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthContextProvider>
    <ProfileContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProfileContextProvider>
  </AuthContextProvider>
);
