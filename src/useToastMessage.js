import { useState } from "react";
export const useToastMessage = () => {
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [severity, setSeverity] = useState(false);

  const handleToastMsg = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setShowMessage(true);
  };

  return [message, severity, showMessage, setShowMessage, handleToastMsg];
};
