import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

function initialTheme(): Theme {
  if (typeof localStorage === 'undefined') return 'light';
  if (localStorage.getItem('theme')) return localStorage.getItem('theme') as Theme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>(initialTheme());

  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }
  }, [theme]);

  return { theme, toggleTheme: setTheme };
}
