import { useContext } from "react";
import { authenticateUser } from "../handlers/LoginHandler";
import AppContext from "../context/AppContext";

function Login() {
  sessionStorage.removeItem("token");
  const {
    username,
    password,
    setUsername,
    setPassword,
    setIsAuthenticated,
    navigate,
    setError,
  } = useContext(AppContext);

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
                setPassword,
                setIsAuthenticated
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
