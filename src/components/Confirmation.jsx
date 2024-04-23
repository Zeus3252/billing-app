import { useContext } from "react";
import { PaymentHandler } from "../handlers/PaymentHandler";
import AppContext from "../context/AppContext";

function Confirmation() {
  const {
    format,
    modal,
    setModal,
    paymentAmount,
    accountID,
    setTransactionComplete,
    navigate,
    setError,
  } = useContext(AppContext);

  function getPaymentHandler() {
    {
      modal &&
        PaymentHandler(
          format,
          paymentAmount,
          accountID,
          navigate,
          setError,
          setTransactionComplete
        ) &&
        setModal(false);
    }
  }

  return (
    <div className="modalBehind" style={{ display: modal ? "" : "none" }}>
      <div className="modalBody">
        <div>
          <h3 className="mediumText">Are you sure?</h3>
          <p className="smallText">
            Once this transfer is made, it cannot be cancelled.
          </p>
        </div>
        <div>
          <button
            className="confirmButton"
            onClick={() => {
              getPaymentHandler();
            }}
          >
            Continue
          </button>
          <button className="cancelButton" onClick={() => setModal(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
