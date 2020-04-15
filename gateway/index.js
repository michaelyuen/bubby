const ws = require("ws");
const { ApolloLink, split } = require("apollo-link");
const { ApolloServer } = require("apollo-server");
const { HttpLink } = require("apollo-link-http");
const { WebSocketLink } = require("apollo-link-ws");
const { getMainDefinition } = require("apollo-utilities");
const fetch = require("node-fetch");
const {
  introspectSchema,
  makeRemoteExecutableSchema,
  mergeSchemas,
} = require("graphql-tools");

const isProduction = process.env.NODE_ENV === "production";

const serverBaseUrl = isProduction
  ? "https://bubby-apollo.netlify.com"
  : `http://localhost:9000`;

const serverLink = new HttpLink({
  uri: `${serverBaseUrl}/.netlify/functions/graphql`,
  fetch,
});

const messagesLink = new HttpLink({
  uri: `http://localhost:4000`,
  fetch,
});

// const messagesWsLink = new WebSocketLink({
//   uri: `ws://localhost:4000/graphql`,
//   options: {
//     reconnect: true,
//   },
//   webSocketImpl: ws,
// });

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
// const messagesLink = split(
//   // split based on operation type
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     console.log(definition);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   messagesWsLink,
//   messagesHttpLink
// );

async function startServer() {
  const serverSchema = await introspectSchema(serverLink);
  const messagesSchema = await introspectSchema(messagesLink);
  //const messagesWsSchema = await introspectSchema(messagesWsLink);

  const serverExecutableSchema = makeRemoteExecutableSchema({
    schema: serverSchema,
    link: serverLink,
  });

  const messagesExecutableSchema = makeRemoteExecutableSchema({
    schema: messagesSchema,
    link: messagesLink,
  });

  // const messagesWsExecutableSchema = makeRemoteExecutableSchema({
  //   schema: messagesWsSchema,
  //   link: messagesWsLink,
  // });

  const schema = mergeSchemas({
    schemas: [
      serverExecutableSchema,
      messagesExecutableSchema,
      // messagesWsExecutableSchema,
    ],
  });
  const server = new ApolloServer({ schema });
  return server.listen({ port: 9001 });
}

startServer().then(({ url }) => {
  console.log(`Gateway ready at ${url} 🏛️`);
});
