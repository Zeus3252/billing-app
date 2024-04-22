export async function getBalance(accountID, setBalance, formatter) {
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
    if (result.length === 0) {
      return null;
    }
    setBalance(formatter.format(result.balance));
  } catch (error) {
    console.error(error);
    return null;
  }
}
