export async function PaymentHandler(
  user,
  setStatus,
  paymentAmount,
  format,
  navigate,
  setError
) {
  const apiToken = sessionStorage.getItem("token");
  const GENERATED_REFERENCE = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");

  const payload = {
    paymentAmount: paymentAmount,
    paymentOption: "ALL_UNPAID_INVOICES",
    locationId: 103,
    reference: GENERATED_REFERENCE,
  };

  try {
    const response = await fetch(
      `https://sandbox-api.camvio.cloud/aboss-api/rest/v1/account/${encodeURIComponent(
        user.accountID
      )}/payment/external`,
      {
        method: "POST",
        headers: {
          "X-API-Token": apiToken,
          "Content-Type": "application/json",
          Accept: "application/json;charset=UTF-8",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      setError(result.error.message);
      return;
    }

    setStatus((prevState) => ({
      ...prevState,
      transactionComplete: true,
    }));

    navigate("/paymentcomplete");
  } catch (error) {
    setError("Unable to connect. Please check your network settings.");
    return;
  }
}
