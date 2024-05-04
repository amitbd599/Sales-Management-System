import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AllInvoice from "./pages/AllInvoice";
import Setting from "./pages/Setting";
import Update from "./pages/Update";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ForgotPassword from "./pages/ForgotPassword";
import OTPCode from "./pages/OTPCode";
import ChangePassword from "./pages/ChangePassword";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route exact path="/create-invoice" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route exact path="/all-invoice" element={<PrivateRoute><AllInvoice /></PrivateRoute>} />
        <Route exact path="/setting" element={<PrivateRoute><Setting /></PrivateRoute>} />
        <Route exact path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route exact path="/update" element={<Update />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/registration" element={<Registration />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/otp-code/:email" element={<OTPCode />} />
        <Route exact path="/change-password/:email/:otp" element={<ChangePassword />} />
        <Route exact path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
