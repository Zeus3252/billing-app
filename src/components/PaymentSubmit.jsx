import { useEffect, useContext } from "react";
import { getBalance } from "../handlers/BalanceHandler";
import AppContext from "../../context/AppContext";
import Confirmation from "./Confirmation";

const PaymentSubmit = () => {
  const {
    accountID,
    setPaymentAmount,
    paymentAmount,
    setError,
    balance,
    accountNumber,
    setBalance,
    setModal,
    formatter,
  } = useContext(AppContext);

  useEffect(() => {
    setError("");
    getBalance(accountID, setBalance, formatter);
  }, []);

  function handleInputChange(e) {
    e.target.value = e.target.value.replace(/[^\d.]/g, "");
    const cleanedInput = e.target.value;
    if (!isNaN(cleanedInput)) {
      setPaymentAmount(cleanedInput);
    }
  }

  function handleInputBlur(e) {
    const cleanedInput = e.target.value.replace(/[$,]/g, "");
    if (!isNaN(cleanedInput)) {
      e.target.value = formatter.format(cleanedInput);
    }
  }

  return (
    <div>
      <h2 className="mediumText">Your Account Number: {accountNumber}</h2>
      <h3 className="smallText">Pay invoices below.</h3>
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            className="field"
            type="text"
            placeholder="Amount (e.g., 50.40, $100)"
            maxLength={16}
            onChange={(e) => {
              handleInputChange(e);
            }}
            onBlur={(e) => {
              handleInputBlur(e);
            }}
          />
        </form>
        <div>
          <button
            className="nextButton"
            onClick={() => {
              {
                paymentAmount != null &&
                parseFloat(paymentAmount) < 10001 &&
                parseFloat(paymentAmount) > 0
                  ? (setError(""), setModal(true))
                  : setError("Please enter a valid amount");
              }
            }}
          >
            Make Payment
          </button>
        </div>
      </div>
      <div>
        <p className="balanceText">
          Balance: {balance ? `${balance}` : "Loading..."}
        </p>
      </div>
      <div>
        <hr></hr>
        <p className="help">Maximum of $10,000 allowed per transfer.</p>
      </div>
      <div>
        <Confirmation />
      </div>
    </div>
  );
};

export default PaymentSubmit;
