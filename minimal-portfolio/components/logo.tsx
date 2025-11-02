"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

export default function Logo() {
  const [visible, setVisible] = useState(true)
  const lastY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    // Only enable the hide-on-scroll behavior on small screens (mobile)
    const mq = window.matchMedia("(max-width: 1023px)")
    if (!mq.matches) return // do nothing on larger screens

    lastY.current = window.scrollY

    function onScroll() {
      if (ticking.current) return
      ticking.current = true
      window.requestAnimationFrame(() => {
        const currentY = window.scrollY
        const delta = currentY - lastY.current
        // if scrolling down more than 5px hide
        if (delta > 5) {
          setVisible(false)
        } else if (delta < -5) {
          // scrolling up
          setVisible(true)
        }
        lastY.current = currentY
        ticking.current = false
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <Link
      href="/"
      className={`fixed top-6 left-6 z-50 p-3 rounded-md pointer-events-auto transform transition-all duration-300 ease-in-out ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0 pointer-events-none"
      }`}
    >
      <img src="/logo.png" alt="Logo" className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 xl:w-44 xl:h-44" />
    </Link>
  )
}
