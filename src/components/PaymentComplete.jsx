import { useEffect, useContext } from "react";
import AppContext from "../../context/AppContext";

function PaymentComplete() {
  const {
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

  return (
    <div>
      <h1 className="lastText">Success</h1>
      <h3 className="mediumText">
        New Balance: {newBalance ? formatter.format(newBalance) : "Loading..."}
      </h3>
      <p className="mediumText">
        Payment Amount:{" "}
        {paymentAmount
          ? formatter.format(paymentAmount.replace(/[$,]/g, ""))
          : "Loading..."}
      </p>
      <div />
      <div>
        <p className="transactionCompleteMessage">
          Thank you for your transaction. For security reasons, it is
          recommended to close this tab.
        </p>
      </div>
    </div>
  );
}
export default PaymentComplete;
