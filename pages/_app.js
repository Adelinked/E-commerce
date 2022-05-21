import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { useStore } from "../store/store";
import { AppWrapper } from "../context";

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <AppWrapper value={pageProps.value}>
          <Component {...pageProps} />
          <ToastContainer />
        </AppWrapper>
      </SessionProvider>
    </Provider>
  );
}
