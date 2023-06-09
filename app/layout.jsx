import './globals.css';
import { Inter } from "next/font/google"
import Header from '@/components/Header/Header';

export const metadata = {
  title: 'Clock App',
  description: 'Simple Clock App',
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
};