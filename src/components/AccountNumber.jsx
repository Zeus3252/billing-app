import { useContext, useEffect } from "react";
import { AccountIDHandler } from "../handlers/AccountIDHandler";
import AppContext from "../context/AppContext";
import Logout from "./Logout";

function AccountNumber() {
  const { user, setUser, setStatus, setModal, navigate, setError } =
    useContext(AppContext);

  function handleInputChange(e) {
    e.target.value = e.target.value.replace(/[^\d]/g, "");
    const cleanedInput = e.target.value;
    if (!isNaN(cleanedInput)) {
      setUser((prevState) => ({
        ...prevState,
        accountNumber: cleanedInput,
      }));
    }
  }

  function handleOnBlur(e) {
    e.target.value = e.target.value.replace(/\D/g, "");
  }

  useEffect(() => {
    setError("");
    setUser((prevState) => ({
      ...prevState,
      //accountNumber: null,
      accountID: null,
    }));
    setModal(null);
  }, []);

  function isValidInput() {
    setError("");
    const regex = /^[0-9]*$/;
    if (!regex.test(user.accountNumber) || user.accountNumber.length != 6) {
      setError("Please enter number that meets the requirements.");
      return false;
    }
    return true;
  }

  function submitForm() {
    isValidInput() &&
      AccountIDHandler(
        user.accountNumber,
        setUser,
        setStatus,
        navigate,
        setError
      );
  }

  function handleEnterPress(e) {
    if (e.key === "Enter") {
      submitForm();
    }
  }

  return (
    <div>
      <div>
        <h1 className="largeText">Enter Account Number</h1>
      </div>
      <div>
        <form noValidate onSubmit={(e) => e.preventDefault()}>
          <input
            required
            className="field"
            type="text"
            placeholder="Account Number"
            pattern="^\d{6}$"
            value="900220"
            maxLength={6}
            onKeyDown={(e) => handleEnterPress(e)}
            onChange={(e) => {
              handleInputChange(e);
            }}
            onBlur={(e) => handleOnBlur(e)}
          />
        </form>
        <div>
          <button
            className="nextButton"
            type="submit"
            onClick={() => {
              submitForm();
            }}
          >
            Submit &#10148;
          </button>
        </div>
      </div>
      <div>
        <br />
        <p className="smallerText">Must be 6 digits</p>
      </div>
      <Logout />
    </div>
  );
}

export default AccountNumber;
