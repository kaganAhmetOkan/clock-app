"use client"
import style from "./Header.module.css"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const pages = [
    "/",
    "/stopwatch",
    "/timer",
    "/alarms",
  ];
  
  return (
    <header className={style.main}>
      {pages.map((page) => {
        const innerText = page.length > 1 ? page.substring(1) : "Clock";
        return (
          <Link
            key={page}
            href={page}
            data-active={pathname === page}
            className={style.link}
          >
            {innerText}
          </Link>);
      })}
    </header>
  );
};