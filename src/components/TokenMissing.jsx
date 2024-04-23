import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";

function TokenMissing() {
  const { setError, navigate } = useContext(AppContext);

  useEffect(() => {
    sessionStorage.removeItem("token");
    setError("Unauthorized token. Redirecting to sign in...");

    setTimeout(() => {
      navigate("/");
    }, 3000);
  });
}

export default TokenMissing;
