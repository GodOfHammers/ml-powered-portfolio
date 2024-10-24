import { useEffect } from 'react';
import App from 'next/app';
import { parseCookies } from 'nookies';
import CookieConsent from '../components/CookieConsent';
import '../styles/globals.css';

function MyApp({ Component, pageProps, theme }) {
  useEffect(() => {
    if (theme) {
      document.body.className = theme;
    }
  }, [theme]);

  return (
    <>
      <Component {...pageProps} />
      <CookieConsent />
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const cookies = parseCookies(appContext.ctx);
  
  return { 
    ...appProps, 
    theme: cookies.theme || 'dark'
  };
};

export default MyApp;