"use client";
import style from "./Timer.module.css";
import { useEffect, useState } from "react";
import { getClock, getEpoch } from "@/utils/time";

export default function Timer() {
  const [count, setCount] = useState(0);
  const [isPaused, setPaused] = useState(true);
  const [targetTime, setTargetTime] = useState(0);
  const [offsetStart, setOffsetStart] = useState(0);

  // TODO: alert the user to confirm leaving page if a clock is active
  // (onBeforeunload) https://www.npmjs.com/package/react-beforeunload

  // TODO: need web audio api to play sounds
  // for times up sound

  function handleSubmit(event) {
    event.preventDefault();
    const hours = Number.parseInt(event.target[0].value) * 60 * 60;
    const minutes = Number.parseInt(event.target[1].value) * 60;
    const seconds = Number.parseInt(event.target[2].value);
    const start = getEpoch().seconds;
    const target = hours + minutes + seconds + start;
    setTargetTime(target);

    if (target > start) {
      setPaused(false);
      setCount(target - start);
    };
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (targetTime > getEpoch().seconds && !isPaused) {
        setCount(targetTime - getEpoch().seconds);
      } else if (targetTime === getEpoch().seconds) {
        reset();
        alert("Times Up!");
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [count, setCount, isPaused, targetTime]);

  function reset() {
    setTargetTime(getEpoch().seconds);
    setCount(0);
  };

  function pause() {
    if (!isPaused) setOffsetStart(getEpoch().seconds);
    else setTargetTime(targetTime + getEpoch().seconds - offsetStart);

    setPaused(!isPaused);
  };

  const nodeSetTimer = (
  <form className={style.container} onSubmit={(event) => handleSubmit(event)}>
    <div className={style.row}>
      <input className={style.input} type="number" inputMode="numeric" min={0} max={99} defaultValue={0}></input>
      <input className={style.input} type="number" inputMode="numeric" min={0} max={59} defaultValue={0}></input>
      <input className={style.input} type="number" inputMode="numeric" min={0} max={59} defaultValue={0}></input>
    </div>
    <button type="submit">Start</button>
  </form>);

  const nodeCountTimer = (
    <div className={style.container}>
      <h1 className={style.clock}>{getClock(count)}</h1>
      <div className={style.row}>
        <button onClick={pause}>{isPaused ? "Resume" : "Pause"}</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );

  return (
    <div className={style.main}>
      {targetTime > getEpoch().seconds ? nodeCountTimer : nodeSetTimer}
    </div>
  );
};