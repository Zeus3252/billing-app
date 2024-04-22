import AppContext from "../../context/AppContext";
import { useContext } from "react";

function ErrorHandler() {
  const { error } = useContext(AppContext);
  return (
    <div>
      <p className="errorText">{error}</p>
    </div>
  );
}

export default ErrorHandler;
