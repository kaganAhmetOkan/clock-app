import style from "./NewAlarm.module.css";
import { useRouter } from "next/navigation";

export default function NewAlarm() {
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    const h = event.target[0].value;
    const m = event.target[1].value;
    const t = event.target[2].value;

    if (h && m && t){
      const searchParams = new URLSearchParams({ h, m, t }).toString();
      router.replace(`/alarms?${searchParams}`);
    };
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
        step={5}
      ></input>
      <label htmlFor="newTitle" hidden >Title</label>
      <input
        className={style.newTitle}
        id="newTitle"
        name="t"
        defaultValue="New Alarm"
        autoComplete="off"
      ></input>
      <button type="submit" className={style.submit}>
        <div></div>
        <div></div>
      </button>
    </form>
  );
};