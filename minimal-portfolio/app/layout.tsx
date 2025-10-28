import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

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
        {/* Fixed logo in the top-left corner */}
        <img
          src="/logo.png"
          alt="Logo"
          className="fixed top-4 left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-md z-50 pointer-events-auto"
        />

        {children}
      </body>
    </html>
  )
}
