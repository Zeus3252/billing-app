import { useContext } from "react";
import { AccountIDHandler } from "../Handlers/AccountIDHandler";
import AppContext from "../../context/AppContext";

function AccountNumber() {
  const { accountNumber, setAccountNumber, setAccountID, setError, navigate } =
    useContext(AppContext);

  function handleInputChange(e) {
    e.target.value = e.target.value.replace(/[^\d]/g, "");
    const cleanedInput = e.target.value;
    if (!isNaN(cleanedInput)) {
      setAccountNumber(cleanedInput);
    }
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
            onBlur={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}
          />
        </form>
        <div>
          <button
            className="nextButton"
            type="submit"
            onClick={(e) => {
              e.preventDefault(),
                AccountIDHandler(
                  accountNumber,
                  setAccountID,
                  navigate,
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
