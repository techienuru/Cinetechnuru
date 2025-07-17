import { useState } from "react";
import { useEffect } from "react";

const useShowNotification = () => {
  const [showNotification, setShowNotification] = useState(null);

  useEffect(() => {
    if (showNotification) {
      const timeout = setTimeout(() => setShowNotification(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [showNotification]);

  return {
    showNotification,
    setShowNotification,
  };
};

export default useShowNotification;
