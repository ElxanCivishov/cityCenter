import React, { useState, useEffect } from "react";

const TextTyper = ({ textArray, speed }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prevText) => {
        // Continue typing the current text
        return textArray?.substring(0, prevText.length + 1);
      });
    }, speed);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [currentIndex, speed, textArray]);

  return currentText;
};

export default TextTyper;
