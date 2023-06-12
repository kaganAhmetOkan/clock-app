"use client"
import style from "./Clock.module.css";
import useTime from "@/hooks/useTime";

export default function Clock() {
  const { clock, dateString } = useTime();

  return (
    <div className={style.main}>
      <h1>{clock}</h1>
      <h2>{dateString}</h2>
    </div>
  )
}

// Needs loading skeleton