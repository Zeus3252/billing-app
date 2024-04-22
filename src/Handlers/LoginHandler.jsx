export async function authenticateUser(
  username,
  password,
  setError,
  navigate,
  setUsername,
  setPassword
) {
  setError("");
  const regex = /^[a-zA-Z0-9._\-!]+$/;
  if (
    !regex.test(username) ||
    !regex.test(password) ||
    username.length > 30 ||
    password.length > 30
  ) {
    setError("Please enter credentials that meets the requirements.");
    return;
  }

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
    setUsername("");
    setPassword("");
    navigate("/account");
  } catch (error) {
    setError("Unable to connect. Please check your network settings.");
  }
}
