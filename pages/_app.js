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
            <header data-testid="common-header" className="bg-light text-center text-lg-start">
                Common Header
            </header>
            <Component {...pageProps} />
            <footer className="bg-light text-center text-lg-start">
                <p data-testid="common-footer">Common Footer</p>
                <p>
                    Pathname: <span data-testid="footer-pathname">{router.pathname}</span>
                    <br />
                    Query: <span data-testid="footer-query">{JSON.stringify(router.query)}</span>
                    <br />
                    Basepath: {router.basePath}
                </p>
            </footer>
            <h6></h6>
        </>
    )
}