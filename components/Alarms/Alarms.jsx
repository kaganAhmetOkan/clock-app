"use client";
import style from "./Alarms.module.css";
import { useEffect, useState } from "react";
import { pullLocal, pushLocal } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import NewAlarm from "../NewAlarm/NewAlarm";
import Alarm from "../Alarm/Alarm";

export default function Alarms({ searchParams }) {
  const [alarms, setAlarms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const savedAlarms = pullLocal("alarms");
    if (savedAlarms) setAlarms(savedAlarms);
    if (!searchParams) return;

    // handle add event
    const { h: hours, m: minutes, t: title, del: delID } = searchParams;
    if (hours && minutes && title) {
      const newAlarm = { hours, minutes, title, id: Date.now() };
      setAlarms(alarms => [newAlarm, ...alarms]);
    };
    
    // handle delete event
    if (delID) {
      const index = savedAlarms.findIndex(alarm => alarm.id.toString() === delID);
      if (index < 0) console.error("error deleting alarm", index);
      else {
        savedAlarms.splice(index, 1);
        setAlarms(savedAlarms);
      };
    };
  }, [searchParams]);

  useEffect(() => {
    pushLocal("alarms", alarms);
    router.replace("/alarms");
  }, [alarms, router]);

  return (
    <div className={style.main}>
      <NewAlarm />
      <div className={style.alarms}>
        {alarms?.map(alarm => {
          return <Alarm key={alarm.id} alarm={alarm} />;
        })}
      </div>
    </div>
  );
};