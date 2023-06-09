"use client";
import style from "./Stopwatch.module.css";
import { useState, useEffect, useRef } from "react";
import { getSensitiveClock } from "@/utils/time";

export default function Stopwatch() {
  const [isPaused, setPaused] = useState(true);
  const [isActive, setActive] = useState(false);
  const [clock, setClock] = useState("00:00:00");
  const [millisecs, setMillisecs] = useState(".00");
  const [count, setCount] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [offsetStart, setOffsetStart] = useState(0);
  const [laps, setLaps] = useState([]);
  const nodeLaps = useRef();

  useEffect(() => {
    const countdown = setInterval(() => {
      if (!isPaused) {
        setCount(Date.now() - startTime);
      };
    }, 10);

    return () => clearInterval(countdown);
  }, [isPaused, startTime]);

  useEffect(() => {
    const { hours, minutes, seconds, milliseconds} = getSensitiveClock(count);

    setClock(`${hours}:${minutes}:${seconds}`);
    setMillisecs(`.${milliseconds}`);
  }, [count]);

  function startWatch() {
    setPaused(false);
    setActive(true);
    setStartTime(Date.now());
  };

  function resetWatch() {
    setPaused(true);
    setActive(false);
    setCount(0);
    setStartTime(0);
    setLaps([]);
  };

  function handleLap() {
    if (isPaused) resetWatch();
    else {
      if (laps.length > 0) {
        setLaps(laps => [...laps, { count, clock, millisecs, diff: count - laps[laps.length - 1]?.count}]);
      } else {
        setLaps([{ count, clock, millisecs, diff: count }]);
      };

      // timeout here to let the element update its height
      const scrollPosition = nodeLaps.current.scrollHeight;
      const scrollNode = setTimeout(() => {
        nodeLaps.current.scroll({ top: -scrollPosition, behavior: "smooth" });
      }, 50);

      return () => clearTimeout(scrollNode);
    };
  };

  function handlePause() {
    if (!isPaused) setOffsetStart(Date.now());
    else setStartTime(startTime + Date.now() - offsetStart);

    setPaused(!isPaused);
  };

  const nodeStart = <button onClick={startWatch}>Start</button>;

  const nodeControls = (
    <>
      <button onClick={handlePause}>{isPaused ? "Resume" : "Pause"}</button>
      <button onClick={handleLap}>{isPaused ? "Reset" : "Lap"}</button>
    </>
  )

  return (
    <div className={style.main}>
      <h1 className={style.clock}>
        {clock}
        <span>{millisecs}</span>
      </h1>
      <div className={style.buttons}>
        {isActive ? nodeControls : nodeStart}
      </div>
      <div ref={nodeLaps} className={style.laps} data-active={laps.length > 0}>
        {laps.map((lap, index) => {
          const { minutes, seconds, milliseconds } = getSensitiveClock(lap.diff);

          return (
            <div key={lap.count} className={style.lap}>
              <div className={style.index}>{`${index + 1}.`}</div>
              <div className={style.lapClock}>{`${lap.clock}${lap.millisecs}`}</div>
              <div className={style.diff}>{`+ ${minutes}:${seconds}.${milliseconds}`}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};