import { useEffect } from 'react';
import App from 'next/app';  // Add this import
import { parseCookies } from 'nookies';
import '../styles/globals.css';

function MyApp({ Component, pageProps, initialTheme }) {
  useEffect(() => {
    document.body.className = initialTheme;
  }, [initialTheme]);

  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const cookies = parseCookies(appContext.ctx);
  
  return { 
    ...appProps, 
    initialTheme: cookies.theme || 'dark'
  };
};

export default MyApp;