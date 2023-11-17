import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllInvoice from "./pages/AllInvoice";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/all-invoice" element={<AllInvoice />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
