export default (res, error, isTokenExpired) => {
  if (res.status === 401) {
    const userFriendlyMsg =
      error === "Previous Password is not correct"
        ? "Old Password is wrong!"
        : "Unauthorized access. Please sign in first.";

    throw new Error(userFriendlyMsg);
  }

  if (res.status === 403 && isTokenExpired) {
    return { retry: true };
  }

  if (!res.ok) throw new Error("Something went wrong. Please try again.");

  return { retry: false };
};
