import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import TodosProvider from "../store/contexts/todoContext";
import theme from "../chakra/theme";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <TodosProvider>
        <Component {...pageProps} />
      </TodosProvider>
    </ChakraProvider>
  );
}
