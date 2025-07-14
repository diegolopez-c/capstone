import React, { useEffect } from "react";
import logo from "../assets/images/logo.png";
import { useState } from "react";

export default function Datetime() {
  const [curentDate, setCurentDate] = useState(new Date());

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex items-center justify-between px-2 py-1">
      <img src={logo} alt="Clinic All Logo" className="w-24" />
      <h4>{curentDate.toLocaleString(undefined, options)}</h4>
    </div>
  );
}
