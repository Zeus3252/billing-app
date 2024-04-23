import { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: null,
    password: null,
    accountNumber: null,
    accountID: null,
  });

  const [status, setStatus] = useState({
    isAuthenticated: false,
    transactionComplete: false,
    accountNumberEntered: false,
  });

  const [payInfo, setPayInfo] = useState({
    balance: null,
    paymentAmount: null,
    newBalance: null,
  });

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
    setStatus((prevState) => ({
      ...prevState,
      isAuthenticated: !!apiToken,
    }));
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      setUser((prevState) => ({
        ...prevState,
        username: null,
        password: null,
        accountNumber: null,
        accountID: null,
      }));

      setStatus((prevState) => ({
        ...prevState,
        isAuthenticated: false,
        transactionComplete: false,
        accountNumberEntered: false,
      }));

      setPayInfo((prevState) => ({
        ...prevState,
        balance: null,
        paymentAmount: null,
        newBalance: null,
      }));

      setModal(null);
      setError(null);
    }
  }, [location]);

  function resetAllInfo() {
    setUser((prevState) => ({
      ...prevState,
      username: null,
      password: null,
      accountNumber: null,
      accountID: null,
    }));

    setStatus((prevState) => ({
      ...prevState,
      isAuthenticated: false,
      transactionComplete: false,
      accountNumberEntered: false,
    }));

    setPayInfo((prevState) => ({
      ...prevState,
      balance: null,
      paymentAmount: null,
      newBalance: null,
    }));

    setModal(null);
    setError(null);
  }

  return (
    <AppContext.Provider
      value={{
        format,
        user,
        setUser,
        status,
        setStatus,
        payInfo,
        setPayInfo,
        modal,
        setModal,
        error,
        setError,
        location,
        navigate,
        formatter,
        resetAllInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
