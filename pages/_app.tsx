import "../styles/globals.css";
import type { AppProps } from "next/app";

import TodosProvider from "../contexts/todoContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TodosProvider>
      <Component {...pageProps} />
    </TodosProvider>
  );
}
