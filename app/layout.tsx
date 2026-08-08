import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MijnAdvocaat.online',
  description: 'Directe juridische hulp bij spoed',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-slate-900 text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
