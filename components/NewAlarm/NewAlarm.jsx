"use client";
import style from "./NewAlarm.module.css";
import { useRouter } from "next/navigation";

export default function NewAlarm() {
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    const h = Number.parseInt(event.target[0].value);
    const m = Number.parseInt(event.target[1].value);
    const t = event.target[2].value;

    const currentDate = new Date();
    const targetDate = new Date();
    targetDate.setHours(h);
    targetDate.setMinutes(m);
    targetDate.setSeconds(0);

    if (targetDate.getHours() < currentDate.getHours() || (targetDate.getHours() === currentDate.getHours() && targetDate.getMinutes() <= currentDate.getMinutes())) {
      targetDate.setDate(targetDate.getDate() + 1);
    };

    const targetTime = Math.floor(targetDate.getTime() / 1000 / 60);

    router.replace(`/alarms?t=${t}&date=${targetTime}&offset=${targetDate.getTimezoneOffset()}`);
  };

  return (
    <form className={style.main} onSubmit={handleSubmit} >
      <label htmlFor="newHours" hidden >Hours</label>
      <input
        className={style.newHours}
        id="newHours"
        name="h"
        defaultValue={12}
        type="number"
        inputMode="numeric"
        min={0}
        max={24}
        required
      ></input>
      :
      <label htmlFor="newMinutes" hidden >Minutes</label>
      <input
        className={style.newHours}
        id="newMinutes"
        name="m"
        defaultValue={0}
        type="number"
        inputMode="numeric"
        min={0}
        max={59}
        required
      ></input>
      <label htmlFor="newTitle" hidden >Title</label>
      <input
        className={style.newTitle}
        id="newTitle"
        name="t"
        defaultValue="New Alarm"
        autoComplete="off"
        required
      ></input>
      <button type="submit" className={style.submit}>
        <div></div>
        <div></div>
      </button>
    </form>
  );
};