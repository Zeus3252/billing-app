import { useEffect, useContext } from "react";
import AppContext from "../../context/AppContext";

function NavigationHandler() {
  const { navigate } = useContext(AppContext);
  const apiToken = sessionStorage.getItem("token");

  useEffect(() => {
    if (!apiToken) {
      navigate("/");
    }
  }, []);
}

export default NavigationHandler;
