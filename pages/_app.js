import "../styles/globals.css";
import { Provider } from "react-redux";
import { useStore } from "../store/store";
import { AppWrapper } from "../context";

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <AppWrapper value={pageProps.value}>
        <Component {...pageProps} />
      </AppWrapper>
    </Provider>
  );
}
