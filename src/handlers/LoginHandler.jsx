export async function authenticateUser(
  user,
  setUser,
  setStatus,
  navigate,
  setError
) {
  try {
    const response = await fetch(
      `https://sandbox-api.camvio.cloud/aboss-api/rest/v1/auth/login?j_password=${encodeURIComponent(
        user.password
      )}&j_username=${encodeURIComponent(user.username)}`,
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

    setUser((prevState) => ({
      ...prevState,
      username: "",
      password: "",
    }));

    setStatus((prevState) => ({
      ...prevState,
      isAuthenticated: true,
    }));

    navigate("/account");
  } catch (error) {
    setError("Unable to connect. Please check your network settings.");
    return;
  }
}
