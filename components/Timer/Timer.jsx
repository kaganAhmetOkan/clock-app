"use client";
import style from "./Timer.module.css";
import { useEffect, useState } from "react";

export default function Timer() {
  const [countdownMS, setCountdownMS] = useState(0);
  const [countdown, setCountdown] = useState("");
  const [isPaused, setPaused] = useState(true);

  // TODO: pausing and unpausing doesn't seem to be accurate
  // time should be tracked with setInterval, check https://stackoverflow.com/questions/21277900/how-can-i-pause-setinterval-functions
  // TODO: alert the user to confirm leaving page if a countdown is active
  // (onBeforeunload) https://www.npmjs.com/package/react-beforeunload


  function handleSubmit(event) {
    event.preventDefault();
    const hours = Number.parseInt(event.target[0].value) * 60 * 60;
    const minutes = Number.parseInt(event.target[1].value) * 60;
    const seconds = Number.parseInt(event.target[2].value);
    const value = hours + minutes + seconds;

    if (value > 0) {
      setPaused(false);
      setCountdownMS(value);
    };
  };

  useEffect(() => {
    const count = setInterval(() => {
      if (countdownMS > 0 && !isPaused) setCountdownMS(countdownMS - 1);
    }, 1000);

    return () => clearInterval(count);
  }, [countdownMS, setCountdownMS, isPaused]);

  useEffect(() => {
    if (countdownMS > 0) {
      const hours = ("0" + Math.floor((countdownMS - 1) / 60 / 60 % 99)).slice(-2);
      const minutes = ("0" + Math.floor((countdownMS - 1) / 60 % 60)).slice(-2);
      const seconds = ("0" + Math.floor((countdownMS - 1) % 60)).slice(-2);
  
      setCountdown(`${hours}:${minutes}:${seconds}`);
    } else setCountdown(`00:00:00`);
  }, [countdownMS, setCountdownMS]);

  const nodeSetTimer = (
  <form className={style.container} onSubmit={(event) => handleSubmit(event)}>
    <div className={style.row}>
      <input className={style.input} type="number" inputMode="numeric" min={0} max={99} defaultValue={0}></input>
      <input className={style.input} type="number" inputMode="numeric" min={0} max={59} defaultValue={0}></input>
      <input className={style.input} type="number" inputMode="numeric" min={0} max={59} defaultValue={0}></input>
    </div>
    <button className={style.button} type="submit">Start</button>
  </form>);

  const nodeCountTimer = (
    <div className={style.container}>
      <h1 className={style.countdown}>{countdown}</h1>
      <div className={style.row}>
        <button
          onClick={() => setPaused(!isPaused)}
          className={style.button}
        >{isPaused ? "Resume" : "Pause"}</button>
        <button onClick={() => setCountdownMS(0)} className={style.button}>Reset</button>
      </div>
    </div>
  );

  return (
    <div className={style.main}>
      {countdownMS > 0 ? nodeCountTimer : nodeSetTimer}
    </div>
  );
};