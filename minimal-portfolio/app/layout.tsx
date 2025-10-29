import type React from "react"
import Link from "next/link"
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
          className="fixed top-6 left-6 p-3 w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 xl:w-44 xl:h-44 rounded-md z-50 pointer-events-auto "
          />
          {/* Fixed logo in the top-left corner (clickable) */}
          <Link href="/" className="fixed top-6 left-6 z-50">
            <img
              src="/logo.png"
              alt="Logo"
              className="p-3 w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 xl:w-44 xl:h-44 rounded-md pointer-events-auto bg-white/10"
            />
          </Link>
        {children}
      </body>
    </html>
  )
}
