import style from "./Alarm.module.css";
import { useRouter } from "next/navigation";

export default function Alarm({ alarm }) {
  const router = useRouter();

  function handleDelete() {
    router.replace(`/alarms?del=${alarm.id}`);
  };
  
  return (
    <div className={style.main}>
      <div className={style.clock}>{`${alarm.hours}:${alarm.minutes}`}</div>
      <div className={style.title}>{alarm.title}</div>
      <button className={style.delete} onClick={handleDelete}>
        <div></div>
        <div></div>
      </button>
    </div>
  );
};