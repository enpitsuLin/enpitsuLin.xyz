import { createDomMotionComponent } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import FaMoon from '~icons/fa6-solid/moon';
import FaSun from '~icons/fa6-solid/sun';
import useTheme from '../hooks/useTheme';

const Button = createDomMotionComponent('button');
export const ThemeSwitch: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  return (
    <Button
      className="ml-1 flex h-8 w-8 my-1.5 items-center justify-center bg-transparent p-0 text-lg sm:ml-4"
      whileHover={{
        scale: 1.2,
        rotate: 220,
        transition: { duration: 0.2 }
      }}
      whileTap={{
        scale: 0.7,
        rotate: 360,
        transition: { duration: 0.2 }
      }}
      aria-label="Toggle Dark Mode"
      type="button"
      onClick={() => {
        toggleTheme(theme === 'dark' ? 'light' : 'dark');
      }}
    >
      {mounted && theme === 'dark' ? (
        <FaSun className="w-20px h-20px hover:text-amber-600" />
      ) : (
        <FaMoon className="w-20px h-20px hover:text-blue-500" />
      )}
    </Button>
  );
};
