import { useContext } from "react";
import AppContext from "../context/AppContext";

function Logout() {
  const { navigate, resetAllInfo } = useContext(AppContext);

  return (
    <div className="navBar">
      <button
        className="logoutButton"
        onClick={() => {
          resetAllInfo();
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
