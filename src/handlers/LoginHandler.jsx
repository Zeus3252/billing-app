export async function authenticateUser(
  username,
  password,
  setError,
  navigate,
  setUsername,
  setPassword,
  setIsAuthenticated
) {
  try {
    const response = await fetch(
      `https://sandbox-api.camvio.cloud/aboss-api/rest/v1/auth/login?j_password=${encodeURIComponent(
        password
      )}&j_username=${encodeURIComponent(username)}`,
      {
        headers: {
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

    sessionStorage.setItem("token", result.token);
    setIsAuthenticated(true);
    setUsername("");
    setPassword("");
    navigate("/account");
  } catch (error) {
    setError("Unable to connect. Please check your network settings.");
    return;
  }
}
