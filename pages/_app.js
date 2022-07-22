import '../styles/globals.css'
import Layout from '../componnet/Layout';
import { Provider } from 'react-redux'
import {store} from '../state/store';
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </Provider>
  )
}

export default MyApp
