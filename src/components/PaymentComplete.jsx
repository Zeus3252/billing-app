import { useEffect, useContext } from "react";
import AppContext from "../context/AppContext";
import Logout from "./Logout";

function PaymentComplete() {
  const { setUser, setStatus, payInfo, setPayInfo, format, formatter } =
    useContext(AppContext);

  useEffect(() => {
    setStatus((prevState) => ({
      ...prevState,
      isAuthenticated: false,
    }));

    setUser((prevState) => ({
      ...prevState,
      accountID: null,
      accountNumber: null,
    }));

    const cleanedBalance = parseFloat(payInfo.balance.replace(/[$,]/g, ""));
    const cleanedPayment = parseFloat(
      payInfo.paymentAmount.replace(/[$,]/g, "")
    );

    const newBalance = cleanedBalance - cleanedPayment;

    setPayInfo((prevState) => ({
      ...prevState,
      newBalance: newBalance,
    }));
  }, []);

  const GENERATED_REFERENCE = format(new Date(), "MM/dd/yy");

  sessionStorage.removeItem("token");

  return (
    <div>
      <h1 className="lastText">Success</h1>

      <h3 className="mediumText balanceText ">
        New Balance:{" "}
        {payInfo.newBalance
          ? formatter.format(payInfo.newBalance)
          : "Loading..."}
      </h3>
      <p className="mediumText">
        Payment Amount:{" "}
        {payInfo.paymentAmount
          ? formatter.format(payInfo.paymentAmount.replace(/[$,]/g, ""))
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
      <Logout />
    </div>
  );
}
export default PaymentComplete;
