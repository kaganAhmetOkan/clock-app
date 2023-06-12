import { useState, useEffect } from "react";

export default function useTime() {
  const [time, setTime] = useState(Date.now());
  const [clock, setClock] = useState("00:00:00");
  const [dateString, setDateString] = useState("Today is...");

  useEffect(() => {
    const updateTime = setInterval(() => {
      const date = new Date();
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      const seconds = ("0" + date.getSeconds()).slice(-2);

      setTime(Date.now());
      setClock(`${hours}:${minutes}:${seconds}`);
      setDateString(date.toDateString());
    }, 1000);

    return () => clearInterval(updateTime);
  }, []);

  const timeProps = {
    time,
    clock,
    dateString,
  };

  return timeProps;
};