import type React from "react"
import Link from "next/link"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import Logo from "@/components/logo"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: "Kevin Pelaez Cruzado - Consultorias",
  description: "Abogado, trabajador social y defensor de derechos humanos con experiencia y profesor en la UPAO.",
  generator: "v0.app",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="font-sans antialiased">
        {/* Logo (client): hides on scroll down in mobile, shows on scroll up */}
        <Logo />
        {children}
      </body>
    </html>
  )
}
