import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import AppContext from "../../context/AppContext";

function NavigationHandler() {
  const { navigate, setError } = useContext(AppContext);

  const location = useLocation();

  useEffect(() => {
    setError("");
    let visitedRoutes = JSON.parse(
      sessionStorage.getItem("visitedRoutes") || "[]"
    );
    const apiToken = sessionStorage.getItem("token");

    if (location.pathname === "/") {
      sessionStorage.removeItem("visitedRoutes");
      visitedRoutes = [];
    } else {
      if (!apiToken || visitedRoutes.includes(location.pathname)) {
        sessionStorage.removeItem("token");
        navigate("/");
      } else if (!visitedRoutes.includes(location.pathname)) {
        visitedRoutes.push(location.pathname);
        sessionStorage.setItem("visitedRoutes", JSON.stringify(visitedRoutes));
      }
    }
  }, [location, navigate]);

  return null;
}

export default NavigationHandler;
