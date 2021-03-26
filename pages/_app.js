import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/global.css'
import Head from 'next/head'
import { useRouter } from 'next/router'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    const router = useRouter();
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <h6>Common Header</h6>
            <h6>Pathname: {router.pathname}</h6>
            <h6>Query: {JSON.stringify(router.query)}</h6>
            <Component {...pageProps} />
            <h6>Common Footer</h6>
        </>
    )
}