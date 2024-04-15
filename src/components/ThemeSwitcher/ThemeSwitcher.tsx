'use client';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export default function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();


  // const isDarkMode = window.matchMedia('(prefers-color-scheme: light)').matches;
  // useEffect(() => {
  //   if (localStorage.getItem('theme') === 'system')
  //     setTheme(isDarkMode ? 'dark' : 'light');
  // }, [isDarkMode, setTheme]);

  // const toggleThemeHandler = () => {
  //   setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  // };

  return <button onClick={() => setTheme('light')}>Switch theme</button>;
}
