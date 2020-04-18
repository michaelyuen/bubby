const { ApolloServer } = require("apollo-server");
const { split } = require("apollo-link");
const { HttpLink } = require("apollo-link-http");
const { WebSocketLink } = require("apollo-link-ws");
const { getMainDefinition } = require("apollo-utilities");
const {
  introspectSchema,
  makeRemoteExecutableSchema,
  mergeSchemas,
} = require("graphql-tools");
const fetch = require("node-fetch");
const webSocketImpl = require("ws");

const isProduction = process.env.NODE_ENV === "production";

const serverBaseUrl = isProduction
  ? "https://bubby-server.netlify.app"
  : `http://localhost:9000`;

const messagesBaseUrl = isProduction
  ? "https://bubby-messaging-server.herokuapp.com"
  : `http://localhost:4000`;

const messagesWsBaseUrl = isProduction
  ? "wss://bubby-messaging-server.herokuapp.com/graphql"
  : `ws://localhost:4000/graphql`;

const serverLink = new HttpLink({
  uri: `${serverBaseUrl}/.netlify/functions/graphql`,
  fetch,
});

const messagesHttpLink = new HttpLink({
  uri: messagesBaseUrl,
  fetch,
});

const wsLink = new WebSocketLink({
  uri: messagesWsBaseUrl,
  options: {
    reconnect: true,
  },
  webSocketImpl,
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const messagesLink = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  messagesHttpLink
);

async function makeSchema() {
  const serverSchema = await introspectSchema(serverLink);
  const messagesSchema = await introspectSchema(messagesLink);

  const serverExecutableSchema = makeRemoteExecutableSchema({
    schema: serverSchema,
    link: serverLink,
  });

  const messagesExecutableSchema = makeRemoteExecutableSchema({
    schema: messagesSchema,
    link: messagesLink,
  });

  return mergeSchemas({
    schemas: [serverExecutableSchema, messagesExecutableSchema],
  });
}

makeSchema().then(async (schema) => {
  const server = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
  });
  const { url } = await server.listen({ port: process.env.PORT || 9001 });
  console.log(`🏛️  Gateway ready at ${url}`);
});
