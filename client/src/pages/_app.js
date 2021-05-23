import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Provider } from "next-auth/client";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import Layout from "../components/Layout/Layout";
import theme from "../theme";
import { ContextProvider } from "../context/context";

const client = new ApolloClient({
  uri: "http://localhost:4000/api/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ApolloProvider client={client}>
        <ChakraProvider resetCSS theme={theme}>
          <ColorModeProvider
            options={{
              useSystemColorMode: true,
            }}
          >
            <ContextProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ContextProvider>
          </ColorModeProvider>
        </ChakraProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
