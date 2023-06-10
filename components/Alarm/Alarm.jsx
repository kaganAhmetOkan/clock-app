"use client";
import style from "./Alarm.module.css";
import { useRouter } from "next/navigation";
import { getClock24 } from "@/utils/time";

export default function Alarm({ alarm }) {
  const router = useRouter();

  function handleDelete() {
    router.replace(`/alarms?del=${alarm.id}`);
  };

  // divided by 1000 to convert to seconds from milliseconds and then converted to local time
  const { hours, minutes } = getClock24( alarm.targetDate / 1000 - alarm.targetOffset * 60 );

  return (
    <div className={style.main}>
      <div className={style.clock}>{`${hours}:${minutes}`}</div>
      <div className={style.title}>{alarm.title}</div>
      <button className={style.delete} onClick={handleDelete}>
        <div></div>
        <div></div>
      </button>
    </div>
  );
};