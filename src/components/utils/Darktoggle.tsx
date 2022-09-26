import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { NightIcon, SunIcon } from './CreateSVG'

import styles from './styles.module.scss'

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  
  useEffect(() => setMounted(true), [])

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className={styles.button}
      onClick={() => setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
     
        {mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
         <SunIcon />
        ) : (
          <NightIcon />
        )}
    </button>
  )
}