export async function AccountIDHandler(
  accountNumber,
  setAccountID,
  navigate,
  setAccountNumberEntered,
  setError
) {
  setError("");
  const regex = /^[0-9]*$/;
  if (!regex.test(accountNumber) || accountNumber.length != 6) {
    setError("Please enter number that meets the requirements.");
    return;
  }

  const apiToken = sessionStorage.getItem("token");
  try {
    const response = await fetch(
      `https://sandbox-api.camvio.cloud/aboss-api/rest/v1/accounts?limit=20&searchType=ACCOUNTNUMBER&term=${encodeURIComponent(
        accountNumber
      )}`,
      {
        headers: {
          "X-API-Token": apiToken,
          "Content-Type": "application/json",
          Accept: "application/json;charset=UTF-8",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      setError(result.error.message);
      return;
    }

    setAccountID(result[0].id);
    setAccountNumberEntered(true);
    navigate("/payment");
  } catch (error) {
    setError("Invalid Account Number associated with this account");
    return;
  }
}
