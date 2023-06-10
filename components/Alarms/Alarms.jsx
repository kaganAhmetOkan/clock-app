"use client";
import style from "./Alarms.module.css";
import { useEffect, useState } from "react";
import { pullLocal, pushLocal } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { getClock24 } from "@/utils/time";
import NewAlarm from "../NewAlarm/NewAlarm";
import Alarm from "../Alarm/Alarm";
import Clock from "../Clock/Clock";

export default function Alarms({ searchParams }) {
  const [alarms, setAlarms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const savedAlarms = pullLocal("alarms");
    if (savedAlarms) setAlarms(savedAlarms);
    if (!searchParams) return;

    // handle add event
    const { date, offset, t: title, del: delID } = searchParams;
    if (date && title && offset) {
      const targetDate = Number.parseInt(date);
      const targetOffset = Number.parseInt(offset);
      const newAlarm = { targetDate, targetOffset, title, id: Date.now() };
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

  useEffect(() => {
    const clock = setInterval(() => {
      const now = Math.floor(Date.now() / 1000 / 60);
      const newAlarms = [];
      alarms?.forEach((alarm) => {
        const { hours, minutes } = getClock24(alarm.targetDate - alarm.targetOffset);
        if (alarm.targetDate === now) alert(`${alarm.title} (${hours}:${minutes}) went off`);
        else newAlarms.push(alarm);
      });

      if (newAlarms.length < alarms.length) setAlarms(newAlarms);
    }, 1000);

    return () => clearInterval(clock);
  }, [alarms]);

  return (
    <div className={style.main}>
      <Clock />
      <NewAlarm />
      <div className={style.alarms}>
        {alarms?.map(alarm => {
          return <Alarm key={alarm.id} alarm={alarm} />;
        })}
      </div>
    </div>
  );
};

// TODO: Option to toggle alarms
// TODO: Option to set repeat on alarms
// TODO: option to set repeat on specific days on alarms
// TODO: option to edit alarms
// TODO: a countdown in alarm telling in how many minutes the alarm will go off.
// TODO: clock interval isnt precise (runs every 30s)
// TODO: alarms that went off when the app was closed should alert the user when the app opens

// BUG: alert goes off twice
// BUG: both the clock and alarm components have an interval for updating time, that runs every same seconds. This is inefficient can these two intervals could be merged

// TODO: idea: get every component to run in the same page, side by side, each containing 100vw. When the user selects one of the components in header, the component outside of the screen smoothly slides in. This would solve the multiple time intervals problem, get rid of multiple pages, and allows everything to run in the same place.