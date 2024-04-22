import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { authenticateUser } from "../Handlers/LoginHandler";

function Login() {
  sessionStorage.removeItem("token");
  const { setUsername, setPassword, username, password, setError, navigate } =
    useContext(AppContext);

  return (
    <div>
      <div>
        <h1 className="largeText">Sign In</h1>
      </div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            className="field"
            type="text"
            placeholder="Username"
            maxLength={30}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            className="field"
            type="password"
            placeholder="Password"
            maxLength={30}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
      </div>
      <div>
        <button
          className="nextButton"
          type="submit"
          onClick={() => {
            username &&
              password &&
              authenticateUser(
                username,
                password,
                setError,
                navigate,
                setUsername,
                setPassword
              );
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Login;
