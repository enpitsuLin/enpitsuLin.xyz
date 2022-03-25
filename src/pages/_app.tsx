import { ChakraProvider } from "@chakra-ui/react";
import DefaultTheme from "../style/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={DefaultTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
