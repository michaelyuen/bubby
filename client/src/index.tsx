import React from "react";
import ReactDOM from "react-dom";
// import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { ApolloProvider } from "@apollo/react-hooks";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "modern-normalize/modern-normalize.css";

// const isProduction = process.env.NODE_ENV === "production";
// const APi = "http://localhost:9000";
const API = "http://localhost:9001";

// Create an http link:
const httpLink = new HttpLink({
  // uri: `${
  //   isProduction ? "https://bubby-apollo.netlify.com" : `http${API}`
  // }/.netlify/functions/graphql`
  uri: API,
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
  },
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
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
    link,
  ]),
  cache: new InMemoryCache(),
});

// const client = new ApolloClient({
//   // uri: `${API}/.netlify/functions/graphql`,
//   uri: API,
//   cache: new InMemoryCache()
// });

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.register();
