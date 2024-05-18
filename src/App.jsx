import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Login from "./components/Login";
import AccountNumber from "./components/AccountNumber";
import PaymentSubmit from "./components/PaymentSubmit";
import ErrorHandler from "./handlers/ErrorHandler";
import PaymentComplete from "./components/PaymentComplete";
import Date from "./components/Date";
import NavigationHandler from "./handlers/NavigationHandler";
import AppContext from "./context/AppContext";
import "./App.css";

function App() {
  const { status } = useContext(AppContext);
  return (
    <div>
      <Date />
      <Routes basename="/">
        <Route path="/" element={<Login />} />
        {status.isAuthenticated && (
          <>
            {status.isAuthenticated && !status.accountNumberEntered && (
              <Route path="/account" element={<AccountNumber />} />
            )}
            <Route path="/payment" element={<PaymentSubmit />} />
          </>
        )}
        {status.transactionComplete && (
          <Route path="/paymentcomplete" element={<PaymentComplete />} />
        )}
        <Route path="*" element={<NavigationHandler />} />
      </Routes>
      <ErrorHandler />
    </div>
  );
}

export default App;
