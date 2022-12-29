import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../redux/store";
import Circle from "../components/Circle/Circle";
import Keyboard from "../components/keyboard/Keyboard";
import localFont from "@next/font/local";
import Head from "next/head";
import { Plus_Jakarta_Sans } from "@next/font/google";

const garalama = localFont({
  src: [
    {
      path: "../public/fonts/GARALAMA.ttf",
    },
    {
      path: "../public/fonts/GARALAMA.woff",
    },
    {
      path: "../public/fonts/GARALAMA.woff2",
    },
  ],
  variable: "--font-type-heading",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-type-text",
  subsets: ["latin"]
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <style jsx global>{`
        :root {
          --font-type-heading: ${garalama.style.fontFamily};
          --font-type-text: ${plusJakartaSans.style.fontFamily};
        }
      `}</style>
      {/* <main className={`${garalama.variable}`}> */}
      <Circle>
        <Keyboard>
          <Head>
            <link rel="favicon" href="/favicon.ico" />
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
            <meta
              name="description"
              content="Portfolio of Ananta Bipal Subedi | anantabipal.dev"
            />
            <meta
              name="og:title"
              property="og:title"
              content="Portfolio of Ananta Bipal Subedi | anantabipal.dev"
            />
          </Head>
          <Component {...pageProps} />
        </Keyboard>
      </Circle>
      {/* </main> */}
    </Provider>
  );
}
