import { useContext } from "react";
import { PaymentHandler } from "../handlers/PaymentHandler";
import AppContext from "../context/AppContext";

function Confirmation() {
  const {
    user,
    setStatus,
    payInfo,
    modal,
    setModal,
    navigate,
    format,
    setError,
  } = useContext(AppContext);

  function getPaymentHandler() {
    {
      modal &&
        PaymentHandler(
          user,
          setStatus,
          payInfo.paymentAmount,
          format,
          navigate,
          setError
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
