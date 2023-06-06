import './globals.css';
import Header from '@/components/Header/Header';

export const metadata = {
  title: 'Clock App',
  description: 'Simple Clock App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
};