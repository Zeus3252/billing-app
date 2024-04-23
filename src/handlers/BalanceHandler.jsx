export async function getBalance(accountID, setBalance, formatter, setError) {
  const apiToken = sessionStorage.getItem("token");

  try {
    const response = await fetch(
      `https://sandbox-api.camvio.cloud/aboss-api/rest/v1/account/${encodeURIComponent(
        accountID
      )}/balance`,
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

    setBalance(formatter.format(result.balance));
  } catch (error) {
    setError("Unable to connect. Please check your network settings.");
    return;
  }
}
