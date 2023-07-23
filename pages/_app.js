import '../styles/globals.css'
import Layout from '../componnet/Layout';
import { Provider } from 'react-redux'
import {store} from '../state/store';
import Script from 'next/script';
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
    <Layout>
      <Script id="ga-script" strategy='afterInteractive' src="https://www.googletagmanager.com/gtag/js?id=G-7T0SQ669WG"></Script>
      <Script id="ga1-script" strategy='afterInteractive'>
        {
          `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-7T0SQ669WG');`
        }
      </Script>
      <Component {...pageProps} />
    </Layout>
    </Provider>
  )
}

export default MyApp
