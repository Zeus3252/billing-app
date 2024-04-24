import { useContext, useEffect } from "react";
import { authenticateUser } from "../handlers/LoginHandler";
import AppContext from "../context/AppContext";

function Login() {
  const { user, setUser, setStatus, navigate, setError, resetAllInfo } =
    useContext(AppContext);

  useEffect(() => {
    resetAllInfo();
  }, []);

  function isValidInput() {
    setError("");
    const regex = /^[a-zA-Z0-9._\-!]+$/;
    if (
      !regex.test(user.username) ||
      !regex.test(user.password) ||
      user.username.length > 30 ||
      user.password.length > 30
    ) {
      setError("Please enter credentials that meets the requirements.");
      return false;
    }
    return true;
  }

  function submitForm() {
    user.username &&
      user.password &&
      isValidInput() &&
      authenticateUser(user, setUser, setStatus, navigate, setError);
  }

  function handleEnterPress(e) {
    if (e.key === "Enter") {
      submitForm();
    }
  }

  function handleOnBlur(e) {
    e.target.value = e.target.value.replace(/['";<>\\]/g, "");
  }

  return (
    <div>
      <div>
        <h1 className="largeText">Sign In</h1>
      </div>
      <div>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
          }}
          onBlur={(e) => handleOnBlur(e)}
        >
          <input
            required
            className="field"
            type="text"
            placeholder="Username"
            pattern="[A-Za-z0-9._\-!]*"
            maxLength={30}
            onKeyDown={(e) => handleEnterPress(e)}
            onChange={(e) =>
              setUser((prevState) => ({
                ...prevState,
                username: e.target.value,
              }))
            }
          />
          <br />
          <input
            required
            className="field"
            type="password"
            placeholder="Password"
            pattern="[A-Za-z0-9._\-!]*"
            maxLength={30}
            onKeyDown={(e) => handleEnterPress(e)}
            onChange={(e) =>
              setUser((prevState) => ({
                ...prevState,
                password: e.target.value,
              }))
            }
          />
        </form>
      </div>
      <div>
        <button
          className="nextButton"
          type="submit"
          onClick={() => {
            submitForm();
          }}
        >
          Sign In &#10148;
        </button>
      </div>
      <div className="smallText">
        <p>
          Welcome to our secure payment gateway. Please note, you can cancel the
          process at any time by logging out. For your security, if you navigate
          back or refresh at any point, you will be required to log in again.
        </p>
        <p>Username and password each can be up to 30 characters long.</p>
        <p>
          May contain letters (A-Z, a-z), numbers (0-9), periods (.),
          underscores (_), hyphens (-), or exclamation marks (!).
        </p>
        <p>
          Invalid characters will be automatically removed when you move away
          from the input field.
        </p>
      </div>
    </div>
  );
}

export default Login;
