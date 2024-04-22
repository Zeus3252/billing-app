import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Login from "./components/Login";
import AccountNumber from "./components/AccountNumber";
import PaymentSubmit from "./components/PaymentSubmit";
import ErrorHandler from "./handlers/ErrorHandler";
import PaymentComplete from "./components/PaymentComplete";
import NavBar from "./components/NavBar";
import TokenMissing from "./components/TokenMissing";
import AppContext from "../context/AppContext";
import "./App.css";

function App() {
  const { isAuthenticated, transactionComplete } = useContext(AppContext);
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        {isAuthenticated && (
          <>
            <Route path="/account" element={<AccountNumber />} />
            <Route path="/payment" element={<PaymentSubmit />} />
          </>
        )}
        {transactionComplete && (
          <Route path="/paymentcomplete" element={<PaymentComplete />} />
        )}
        <Route path="*" element={<TokenMissing />} />
      </Routes>
      <ErrorHandler />
    </div>
  );
}

export default App;
