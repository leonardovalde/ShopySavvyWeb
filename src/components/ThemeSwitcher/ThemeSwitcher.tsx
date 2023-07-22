'use client';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export default function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  useEffect(() => {
    if (localStorage.getItem('theme') === 'system')
      setTheme(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode, setTheme]);

  const toggleThemeHandler = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return <button onClick={toggleThemeHandler}>Switch theme</button>;
}
