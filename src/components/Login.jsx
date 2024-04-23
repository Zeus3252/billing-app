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

  function isValidInput() {
    setError("");
    const regex = /^[a-zA-Z0-9._\-!]+$/;
    if (
      !regex.test(username) ||
      !regex.test(password) ||
      username.length > 30 ||
      password.length > 30
    ) {
      setError("Please enter credentials that meets the requirements.");
      return false;
    }
    return true;
  }

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
            username && password && isValidInput();
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
      <div>
        <p className="help">
          Welcome to our secure payment gateway. This streamlined process allows
          you to pay your invoices swiftly and securely. Please note, you can
          cancel the process at any time by logging out. Additionally, for your
          security, if you navigate back at any point, you will be required to
          log in again.
        </p>
      </div>
    </div>
  );
}

export default Login;
