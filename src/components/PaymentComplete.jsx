import { useEffect, useContext } from "react";
import AppContext from "../context/AppContext";

function PaymentComplete() {
  const {
    format,
    balance,
    paymentAmount,
    formatter,
    newBalance,
    setNewBalance,
    setIsAuthenticated,
  } = useContext(AppContext);

  useEffect(() => {
    setIsAuthenticated(false);
    const cleanedBalance = parseFloat(balance.replace(/[$,]/g, ""));
    const cleanedPayment = parseFloat(paymentAmount.replace(/[$,]/g, ""));
    const newBalance = cleanedBalance - cleanedPayment;
    setNewBalance(newBalance);
  }, []);

  const GENERATED_REFERENCE = format(new Date(), "MM/dd/yy");

  sessionStorage.removeItem("token");

  return (
    <div>
      <h1 className="lastText">Success</h1>

      <h3 className="mediumText balanceText ">
        New Balance: {newBalance ? formatter.format(newBalance) : "Loading..."}
      </h3>
      <p className="mediumText">
        Payment Amount:{" "}
        {paymentAmount
          ? formatter.format(paymentAmount.replace(/[$,]/g, ""))
          : "Loading..."}
      </p>
      <h2 className="mediumText">{GENERATED_REFERENCE}</h2>
      <div />
      <div>
        <hr></hr>
        <p className="transactionCompleteMessage">
          Thank you for your transaction. For security reasons, it is
          recommended to close this tab.
        </p>
      </div>
    </div>
  );
}
export default PaymentComplete;
