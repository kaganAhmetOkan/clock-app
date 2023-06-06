import './globals.css';

export const metadata = {
  title: 'Clock App',
  description: 'Simple Clock App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};