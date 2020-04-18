import React from "react";
import ReactDOM from "react-dom";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink, split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { ApolloProvider } from "@apollo/react-hooks";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "modern-normalize/modern-normalize.css";

// TODO: find a better way to do with without TS complaining
const env =
  process.env.NODE_ENV === "test"
    ? "test"
    : process.env.NODE_ENV === "production"
    ? "production"
    : "development";

const config = {
  http: {
    development: "http://localhost:9001",
    production: "https://bubby-gateway-server.herokuapp.com",
    test: ""
  },
  ws: {
    development: "ws://localhost:9001/graphql",
    production: "wss://bubby-gateway-server.herokuapp.com/graphql",
    test: ""
  }
};

type Config = typeof config;

const httpLink = new HttpLink({
  uri: config.http[env]
});

const wsLink = new WebSocketLink({
  uri: config.ws[env],
  options: {
    reconnect: true
  }
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

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
    link
  ]),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.register();
