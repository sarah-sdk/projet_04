import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvided } from "./contexts/AuthContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvided>
      <App />
    </AuthProvided>
  </React.StrictMode>,
);
