import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/all-invoice" element={<AllInvoice />} />
        <Route exact path="/setting" element={<Setting />} />
        <Route exact path="/update" element={<Update />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/registration" element={<Registration />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/otp-code/:email" element={<OTPCode />} />
        <Route exact path="/change-password/:email/:otp" element={<ChangePassword />} />
        <Route exact path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
