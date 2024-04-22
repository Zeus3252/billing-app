import { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [transactionComplete, setTransactionComplete] = useState(false);
  const [accountNumber, setAccountNumber] = useState(null);
  const [accountID, setAccountID] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [balance, setBalance] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(null);
  const [newBalance, setNewBalance] = useState(null);
  const [modal, setModal] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    const apiToken = sessionStorage.getItem("token");
    setIsAuthenticated(!!apiToken);
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      setIsAuthenticated(false);
      setTransactionComplete(false);
      setAccountNumber(null);
      setAccountID(null);
      setUsername(null);
      setPassword(null);
      setBalance(null);
      setPaymentAmount(null);
      setNewBalance(null);
      setModal(null);
      setError(null);
    }
  }, [location]);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        transactionComplete,
        setTransactionComplete,
        accountNumber,
        setAccountNumber,
        accountID,
        setAccountID,
        username,
        setUsername,
        password,
        setPassword,
        balance,
        setBalance,
        paymentAmount,
        setPaymentAmount,
        newBalance,
        setNewBalance,
        error,
        setError,
        modal,
        setModal,
        navigate,
        formatter,
        location,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
