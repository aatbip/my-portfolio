import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../redux/store";
import Circle from "../components/Circle/Circle";
import Keyboard from "../components/keyboard/Keyboard";
import localFont from "@next/font/local";
import Head from "next/head";

const garalama = localFont({
  src: "../public/fonts/GARALAMA.ttf",
  variable: "--font-type-heading",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className={`${garalama.variable}`}>
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
      </div>
    </Provider>
  );
}
