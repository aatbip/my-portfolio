import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../redux/store";
import Circle from "../components/Circle/Circle";
import Keyboard from "../components/keyboard/Keyboard";
import localFont from "@next/font/local";

const garalama = localFont({
  src: "../public/fonts/GARALAMA.woff2",
  variable: "--font-type-heading",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className={`${garalama.variable}`}>
        <Circle>
          <Keyboard>
            <Component {...pageProps} />
          </Keyboard>
        </Circle>
      </div>
    </Provider>
  );
}
