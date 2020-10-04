import { AppProps } from "next/app";
import Head from "next/head";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink, split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "../style/theme";
// import * as serviceWorker from "./serviceWorker";

import "modern-normalize/modern-normalize.css";

// TODO: find a better way to do with without TS complaining
const env =
  process.env.NODE_ENV === "test"
    ? "test"
    : process.env.NODE_ENV === "production"
    ? "production"
    : "production";

const config = {
  http: {
    development: "http://localhost:9001",
    production: "https://bubby-gateway-server.herokuapp.com",
    test: "",
  },
  ws: {
    development: "ws://localhost:9001/graphql",
    production: "wss://bubby-gateway-server.herokuapp.com/graphql",
    test: "",
  },
};

type Config = typeof config;

const httpLink = new HttpLink({
  uri: config.http[env],
});

// https://github.com/apollographql/subscriptions-transport-ws/issues/333#issuecomment-359261024
const wsLink =
  typeof window !== "undefined"
    ? new WebSocketLink({
        uri: config.ws[env],
        options: {
          reconnect: true,
        },
      })
    : null;

const link =
  typeof window !== "undefined"
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    link,
  ]),
  cache: new InMemoryCache(),
});

// serviceWorker.register();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>bubby</title>
        {/* <link
          href="https://fonts.googleapis.com/css?family=Gaegu|Open+Sans:400,700|Pacifico|Merriweather&display=swap"
          rel="stylesheet"
        /> */}
      </Head>
      <GlobalStyle />
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  );
}
