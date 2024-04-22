import { useContext } from "react";
import AppContext from "../../context/AppContext";

function ErrorHandler() {
  const { error } = useContext(AppContext);
  return (
    <div>
      <p className="errorText">{error}</p>
    </div>
  );
}

export default ErrorHandler;
