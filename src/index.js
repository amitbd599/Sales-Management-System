import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@material-tailwind/react";
import App from "./App";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import InitLoadingData from "./helper/InitLoadingData";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Toaster position="bottom-center" reverseOrder={false} />
      <App />
      <InitLoadingData />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
