export async function AccountIDHandler(
  accountNumber,
  setUser,
  setStatus,
  navigate,
  setError
) {
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

    if (result.length === 0) {
      setError("Invalid Account Number associated with this account");
      return;
    }

    if (!response.ok) {
      setError(result.error.message);
      return;
    }

    setUser((prevState) => ({
      ...prevState,
      accountID: result[0].id,
    }));

    setStatus((prevState) => ({
      ...prevState,
      accountNumberEntered: true,
    }));

    navigate("/payment");
  } catch (error) {
    setError("Unable to connect. Please check your network settings.");
    return;
  }
}
