"use client"
import style from "./Clock.module.css";
import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState();
  const [dateString, setDateString] = useState();

  useEffect(() => {
    const showTime = setInterval(() => {
      const date = new Date();
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      const seconds = ("0" + date.getSeconds()).slice(-2);
      
      setTime(`${hours}:${minutes}:${seconds}`);
      setDateString(date.toDateString());
      console.log("leak test");
    }, 1000);
    
    return () => clearInterval(showTime);
  }, []);

  return (
    <div className={style.main}>
      <h1>{time}</h1>
      <h2>{dateString}</h2>
    </div>
  )
}