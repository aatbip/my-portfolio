import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../redux/store";
import Circle from "../components/Circle/Circle";
import Keyboard from "../components/keyboard/Keyboard";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Circle>
        <Keyboard>
          <Component {...pageProps} />
        </Keyboard>
      </Circle>
    </Provider>
  );
}
