import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@material-tailwind/react";
import App from "./App";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import 'react-toastify/dist/ReactToastify.min.css';
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import InitLoadingData from "./helper/InitLoadingData";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ThemeProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"

      />

      <ToastContainer />
      <App />
      <InitLoadingData />
    </ThemeProvider>
  </>
);

reportWebVitals();
