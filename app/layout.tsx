import './globals.css';

export const metadata = {
  title: 'AdvocaatDirect - Spoedzaken',
  description: 'Snel een advocaat aan je zijde.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
