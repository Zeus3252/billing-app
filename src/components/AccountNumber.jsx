import { useContext, useEffect } from "react";
import { AccountIDHandler } from "../handlers/AccountIDHandler";
import AppContext from "../context/AppContext";

function AccountNumber() {
  const {
    accountNumber,
    setAccountNumber,
    setAccountID,
    setAccountNumberEntered,
    setModal,
    setPaymentAmount,
    navigate,
    setError,
  } = useContext(AppContext);

  function handleInputChange(e) {
    e.target.value = e.target.value.replace(/[^\d]/g, "");
    const cleanedInput = e.target.value;
    if (!isNaN(cleanedInput)) {
      setAccountNumber(cleanedInput);
    }
  }

  function handleOnBlur(e) {
    e.target.value = e.target.value.replace(/\D/g, "");
  }

  useEffect(() => {
    setError("");
    setAccountNumber(null);
    setAccountID(null);
    setPaymentAmount(null);
    setModal(null);
  }, []);

  function isValidInput() {
    setError("");
    const regex = /^[0-9]*$/;
    if (!regex.test(accountNumber) || accountNumber.length != 6) {
      setError("Please enter number that meets the requirements.");
      return false;
    }
    return true;
  }

  return (
    <div>
      <div>
        <h1 className="largeText">Enter Account Number</h1>
      </div>
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            className="field"
            type="text"
            placeholder="Account Number"
            maxLength={6}
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
              isValidInput() &&
                AccountIDHandler(
                  accountNumber,
                  setAccountID,
                  navigate,
                  setAccountNumberEntered,
                  setError
                );
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <div>
        <p className="help">Must be 6 digits</p>
      </div>
    </div>
  );
}

export default AccountNumber;
