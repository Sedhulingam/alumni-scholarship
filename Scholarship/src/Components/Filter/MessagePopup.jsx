import React, { useState, useEffect } from "react";
import "./MessagePopup.css";

function MessagePopup({ message, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      closePopup();
    }, 5000); // Hide the message after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    onClose && onClose();
  };

  return (
    <div className={`message-popup ${isVisible ? "visible" : "hidden"}`}>
      <span>{message}</span>
      <button onClick={closePopup}>&times;</button>
    </div>
  );
}

export default MessagePopup;
