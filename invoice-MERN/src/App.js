import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllInvoice from "./pages/AllInvoice";
import Setting from "./pages/Setting";
import Update from "./pages/Update";
import Error from "./pages/Error";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/all-invoice" element={<AllInvoice />} />
        <Route exact path="/setting" element={<Setting />} />
        <Route exact path="/update" element={<Update />} />
        <Route exact path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
