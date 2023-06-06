import style from './page.module.css';
import Clock from '@/components/Clock/Clock';

export default function Home() {
  return (
    <main className={style.main}>
      <Clock />
    </main>
  );
};