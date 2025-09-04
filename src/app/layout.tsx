import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { PropsWithChildren } from 'react'

const montserrat = Montserrat({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'REST Client',
  description: 'Final project for the RS School React Course',
}

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>{children}</body>
    </html>
  )
}
