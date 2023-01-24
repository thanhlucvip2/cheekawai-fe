import AxiosClient from "@Axios/axios";
import "../styles/globals.css";
import "@Public/assets/css/style.css";
import { GlobalStateProvider } from "@Store/Provider";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr/_internal";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalStateProvider>
      <SWRConfig
        value={{
          fetcher: (url) => AxiosClient.get(url),
          shouldRetryOnError: false,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </GlobalStateProvider>
  );
}
