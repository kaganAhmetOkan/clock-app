import './globals.css';
import { Ubuntu, Ubuntu_Mono } from "next/font/google"
import Header from '@/components/Header/Header';

export const metadata = {
  title: 'Clock App',
  description: 'Simple Clock App, featuring modern stopwatch, timer, and alarm functionalities.',
};

export const ubuntu = Ubuntu({
  subsets: ["latin"],
  variable: "--font-ubuntu",
  weight: "400",
  display: "swap"
});

export const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin"],
  variable: "--font-ubuntu-mono",
  weight: "400",
  display: "swap"
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${ubuntu.variable} ${ubuntuMono.variable}`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
};