import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { store } from '../store';
import client from '../lib/apollo';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;