"use client"
import { createContext, useContext, useEffect, useState } from "react"

const DarkModeContext = createContext({ dark: false, toggle: () => {} })

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("darkMode")
    if (saved === "true") { setDark(true); document.documentElement.classList.add("dark") }
  }, [])

  const toggle = () => {
    setDark(d => {
      const next = !d
      localStorage.setItem("darkMode", String(next))
      document.documentElement.classList.toggle("dark", next)
      return next
    })
  }

  return (
    <DarkModeContext.Provider value={{ dark, toggle }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export const useDarkMode = () => useContext(DarkModeContext)