import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";

function NavigationHandler() {
  const { setError, navigate, resetAllInfo } = useContext(AppContext);

  useEffect(() => {
    resetAllInfo();
    setError("Authentication invalid. Redirecting to sign in...");

    setTimeout(() => {
      navigate("/billing-app");
    }, 3000);
  }, []);
}

export default NavigationHandler;
