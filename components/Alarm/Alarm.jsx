"use client";
import style from "./Alarm.module.css";
import { useRouter } from "next/navigation";
import { getClock24 } from "@/utils/time";

export default function Alarm({ alarm }) {
  const router = useRouter();

  function handleDelete() {
    router.replace(`/alarms?del=${alarm.id}`);
  };

  const { hours, minutes } = getClock24( alarm.targetDate - alarm.targetOffset );

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