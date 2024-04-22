import { useContext } from "react";
import AppContext from "../../context/AppContext";

function NavBar() {
  const { navigate, setIsAuthenticated } = useContext(AppContext);
  return (
    <div className="navbar">
      <div>
        <button
          className="logoutButton"
          onClick={() => {
            setIsAuthenticated(false), navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default NavBar;
