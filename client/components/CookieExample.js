import { useState, useEffect } from 'react';
import { setCookie, getCookie } from '../utils/cookies';

export default function CookieExample() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = getCookie('theme');
    if (savedTheme) setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setCookie('theme', newTheme, { expires: 365 });
    document.body.className = newTheme;
  };

  return (
    <button 
      onClick={toggleTheme} 
      className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}