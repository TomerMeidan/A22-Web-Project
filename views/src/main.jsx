import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthCONTEXtProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthCONTEXtProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthCONTEXtProvider>
  </React.StrictMode>
);
