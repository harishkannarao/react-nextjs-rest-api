import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/global.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Footer } from '../components/footer/common-footer'
import { useState } from 'react'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const [commonHeader, setCommonHeader] = useState(undefined);
    function getCommonHeader() {
        return commonHeader ? commonHeader : 'Common Header';
    }
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <header data-testid="common-header" className="bg-light text-center text-lg-start">
                {getCommonHeader()}
            </header>
            <Component {...pageProps} setCommonHeader={setCommonHeader} />
            <Footer router={router} />
        </>
    )
}