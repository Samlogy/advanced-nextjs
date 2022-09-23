import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import TodosProvider from "../contexts/todoContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <TodosProvider>
        <Component {...pageProps} />
      </TodosProvider>
    </ChakraProvider>
  );
}
