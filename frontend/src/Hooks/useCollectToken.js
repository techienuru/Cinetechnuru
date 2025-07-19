import { useState } from "react";
import { baseUrl } from "../config";

const useCollectToken = () => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );

  const saveAccessToken = (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
  };

  const refreshAccessToken = async () => {
    try {
      const res = await fetch(`${baseUrl}/refresh/`, {
        credentials: "include",
      });
      if (!res.ok || res.status >= 400)
        throw new Error("Session expired. Please Login Again");

      const data = await res.json();
      // Save to localStorage and
      // Set Access Storage State
      saveAccessToken(data.accessToken);
      setAccessToken(data.accessToken);
      return {
        isValid: true,
      };
    } catch (err) {
      return {
        isValid: false,
        message: err.message,
      };
    }
  };

  return {
    setAccessToken,
    accessToken,
    saveAccessToken,
    refreshAccessToken,
  };
};

export default useCollectToken;
