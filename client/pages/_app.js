import App from 'next/app';
import { parseCookies } from 'nookies';
import '../styles/globals.css';

function MyApp({ Component, pageProps, theme }) {
  return (
    <div className={`app ${theme}`}>
      <Component {...pageProps} />
    </div>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const cookies = parseCookies(appContext.ctx);
  
  return { 
    ...appProps, 
    theme: cookies.theme || 'light'
  };
};

export default MyApp;