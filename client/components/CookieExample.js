import { useState, useEffect } from 'react';
import { setCookie, getCookie, removeCookie } from '../utils/cookies';

export default function CookieExample() {
  const [theme, setTheme] = useState('light');
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedTheme = getCookie('theme');
    const savedUsername = getCookie('username');
    const loginStatus = getCookie('isLoggedIn');

    if (savedTheme) setTheme(savedTheme);
    if (savedUsername) setUsername(savedUsername);
    if (loginStatus === 'true') setIsLoggedIn(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setCookie('theme', newTheme, { expires: 365 });
  };

  const handleLogin = () => {
    const user = 'exampleUser';
    setUsername(user);
    setIsLoggedIn(true);
    setCookie('username', user, { expires: 7 });
    setCookie('isLoggedIn', 'true', { expires: 7 });
  };

  const handleLogout = () => {
    setUsername('');
    setIsLoggedIn(false);
    removeCookie('username');
    removeCookie('isLoggedIn');
  };

  return (
    <div className={`app ${theme}`}>
      <h1>Cookie Example</h1>
      
      <div>
        <h2>Theme Preference</h2>
        <p>Current theme: {theme}</p>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>

      <div>
        <h2>User Session</h2>
        {isLoggedIn ? (
          <>
            <p>Welcome, {username}!</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </div>
    </div>
  );
}