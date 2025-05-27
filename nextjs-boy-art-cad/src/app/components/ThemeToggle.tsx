'use client'

import {useTheme} from 'next-themes'
import {useEffect, useState} from 'react'

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const {resolvedTheme, setTheme} = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'

  return (
    <label className="inline-flex items-center cursor-pointer select-none">
      <span className="mr-2 text-sm">{isDark ? 'Dark' : 'Light'}</span>
      <div className="relative">
        <input
          type="checkbox"
          checked={isDark}
          onChange={() => setTheme(isDark ? 'light' : 'dark')}
          className="sr-only peer"
        />
        <div
          className={`
            w-11 h-6 rounded-full border-1 transition-colors duration-300
            ${isDark ? 'bg-black border-white' : 'bg-black border-black'}
          `}
        ></div>
        <div
          className={`
            absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300
            ${isDark ? 'translate-x-full' : 'translate-x-0'}
            border-1 ${isDark ? 'border-black' : 'border-black'}
          `}
        ></div>
      </div>
    </label>
  )
}

export default ThemeToggle
