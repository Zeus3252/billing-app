export async function PaymentHandler(
  format,
  paymentAmount,
  accountID,
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
        accountID
      )}/payment/external`,
      {
        method: "POST",
        headers: {
          "X-API-Token": apiToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const result = await response.json();
    if (!response.ok) {
      setError(result.error.message);
      return;
    }
    navigate("/paymentcomplete");
  } catch (error) {
    setError("Unable to connect. Please check your network settings.");
  }
}
