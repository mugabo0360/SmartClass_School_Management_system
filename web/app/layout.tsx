// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SmartClass — AI School Management for Uganda',
  description: 'NCDC/CBC compliant school management system with AI-powered reporting, lesson planning, and parent communication.',
  keywords: 'Uganda school management, CBC curriculum, NCDC, school fees Uganda',
  authors: [{ name: 'SmartClass Uganda' }],
  openGraph: {
    title: 'SmartClass — Smarter Schools for Uganda',
    description: 'AI-powered school management built for Ugandan schools',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1a1a2e',
              color: '#fff',
              borderRadius: '10px',
            },
          }}
        />
        {children}
      </body>
    </html>
  )
}
