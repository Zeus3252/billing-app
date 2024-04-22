import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AccountNumber from "./components/AccountNumber";
import PaymentSubmit from "./components/PaymentSubmit";
import ErrorHandler from "./Handlers/ErrorHandler";
import NavigationHandler from "./Handlers/NavigationHandler";
import PaymentComplete from "./components/PaymentComplete";
import NavBar from "./components/NavBar";
import "./App.css";

function App() {
  return (
    <div>
      <NavigationHandler />
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/account" element={<AccountNumber />} />
        <Route path="/payment" element={<PaymentSubmit />} />
        <Route path="/paymentcomplete" element={<PaymentComplete />} />
      </Routes>
      <ErrorHandler />
    </div>
  );
}

export default App;
