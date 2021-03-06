import "../styles/globals.css";
import "katex/dist/katex.min.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps}>
      <ThemeProvider attribute="class">
        <>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
            ></meta>
          </Head>
          <ToastContainer />
          <Component {...pageProps} />
        </>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
