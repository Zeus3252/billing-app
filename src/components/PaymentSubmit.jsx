import { useEffect, useContext } from "react";
import { getBalance } from "../handlers/BalanceHandler";
import AppContext from "../context/AppContext";
import Confirmation from "./Confirmation";

const PaymentSubmit = () => {
  const { user, payInfo, setPayInfo, setModal, formatter, setError } =
    useContext(AppContext);

  useEffect(() => {
    setError("");
    getBalance(user.accountID, setPayInfo, formatter, setError);
  }, []);

  function handleInputChange(e) {
    e.target.value = e.target.value.replace(/[^\d.]/g, "");
    const cleanedInput = e.target.value;
    if (!isNaN(cleanedInput)) {
      setPayInfo((prevState) => ({
        ...prevState,
        paymentAmount: cleanedInput,
      }));
    }
  }

  function handleInputBlur(e) {
    if (e.target.value.length > 0) {
      const cleanedInput = e.target.value.replace(/[^\d.]/g, "");
      if (!isNaN(cleanedInput)) {
        const formattedInput = formatter.format(parseFloat(cleanedInput));
        e.target.value = formattedInput;
        setPayInfo((prevState) => ({
          ...prevState,
          paymentAmount: formattedInput.replace(/[^\d.]/g, ""),
        }));
      }
    }
  }

  function handleConfirmButton() {
    {
      if (payInfo.paymentAmount != null) {
        parseFloat(payInfo.paymentAmount) < 10001 &&
        parseFloat(payInfo.paymentAmount) > 0
          ? (setError(""), setModal(true))
          : setError("Please enter a valid amount");
      }
    }
  }

  return (
    <div>
      <h2 className="mediumText">Your Account Number: {user.accountNumber}</h2>
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
              handleConfirmButton();
            }}
          >
            Make Payment
          </button>
        </div>
      </div>
      <div>
        <p className="balanceText">
          Balance: {payInfo.balance ? `${payInfo.balance}` : "Loading..."}
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
