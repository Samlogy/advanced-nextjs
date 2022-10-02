import { ChakraProvider } from "@chakra-ui/react";

import type { AppProps } from "next/app";
import "../styles/globals.css";

import theme from "../theme";
import TodosProvider from "../store/contexts/todoContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <TodosProvider>
        <Component {...pageProps} />
      </TodosProvider>
    </ChakraProvider>
  );
}
