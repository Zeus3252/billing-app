import { useContext } from "react";
import AppContext from "../context/AppContext";

function NavBar() {
  const { format } = useContext(AppContext);
  const GENERATED_REFERENCE = format(new Date(), "EEEE, MMMM dd, yyyy");

  return (
    <div className="navBar">
      <div>
        <h2 className="date">{GENERATED_REFERENCE}</h2>
      </div>
    </div>
  );
}

export default NavBar;
