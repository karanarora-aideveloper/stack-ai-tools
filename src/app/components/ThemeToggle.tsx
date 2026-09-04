'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  // Initialize theme on component mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'system';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;

    if (newTheme === 'system') {
      // Remove data-theme to use system preference
      root.removeAttribute('data-theme');

      // Apply system preference immediately
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.style.colorScheme = prefersDark ? 'dark' : 'light';
    } else {
      // Set explicit theme override
      root.setAttribute('data-theme', newTheme);
      root.style.colorScheme = newTheme;
    }

    // Persist preference
    localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = () => {
    let nextTheme: Theme;

    if (theme === 'system') {
      nextTheme = 'dark';
    } else if (theme === 'dark') {
      nextTheme = 'light';
    } else {
      nextTheme = 'system';
    }

    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  // Don't render until hydrated to avoid mismatch
  if (!mounted) {
    return (
      <button
        className="theme-toggle theme-toggle--skeleton"
        aria-label="Loading theme toggle..."
        disabled
      >
        <Sun size={20} className="theme-icon theme-icon--sun" />
      </button>
    );
  }

  // Determine if currently in dark mode
  const isDark = theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const getLabel = () => {
    if (theme === 'system') {
      return `Switch to ${isDark ? 'light' : 'dark'} mode (currently system)`;
    }
    return `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={getLabel()}
      title={`Theme: ${theme} ${theme === 'system' ? `(${isDark ? 'dark' : 'light'})` : ''}`}
      type="button"
    >
      {isDark ? (
        <Sun size={20} className="theme-icon theme-icon--sun" strokeWidth={2} />
      ) : (
        <Moon size={20} className="theme-icon theme-icon--moon" strokeWidth={2} />
      )}
    </button>
  );
}
