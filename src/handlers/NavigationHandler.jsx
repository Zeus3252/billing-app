import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";

function NavigationHandler() {
  const { setError, navigate, resetAllInfo } = useContext(AppContext);

  useEffect(() => {
    sessionStorage.removeItem("token");
    resetAllInfo();
    setError("Authentication expired. Redirecting to sign in...");

    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, []);
}

export default NavigationHandler;
