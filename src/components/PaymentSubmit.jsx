import { useEffect, useContext } from "react";
import { getBalance } from "../handlers/BalanceHandler";
import AppContext from "../context/AppContext";
import Confirmation from "./Confirmation";
import Logout from "./Logout";

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
    if (
      payInfo.paymentAmount != null &&
      parseFloat(payInfo.paymentAmount) < 10001 &&
      parseFloat(payInfo.paymentAmount) > 0
    ) {
      setError(""), setModal(true);
    } else {
      setError("Please enter a valid amount");
    }
  }

  return (
    <div className="checkout">
      <h2 className="mediumText">Your Account Number: {user.accountNumber}</h2>
      <h3 className="smallerText">
        Pay invoices below. Click button to confirm.
      </h3>

      <div>
        <form noValidate onSubmit={(e) => e.preventDefault()}>
          <input
            required
            className="field"
            type="text"
            placeholder="Amount (e.g., 50.40, $100)"
            pattern="^(?=.*\$)(?=.*\.)[0-9$.]{3,}$"
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
            Make Payment &#10148;
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
        <p className="smallerText">Maximum of $10,000 allowed per transfer.</p>
      </div>
      <div>
        <Confirmation />
      </div>
      <Logout />
    </div>
  );
};

export default PaymentSubmit;
