const { ApolloServer } = require("apollo-server");
const resolvers = require("./resolvers");
const typeDefs = require("./schema");
const { shared } = require("../server/src/lambda/graphql");

const validateToken = (authToken) => {
  // ... validate token and return a Promise, rejects in case of an error
};

const findUser = (authToken) => {
  return (tokenValidationResult) => {
    // ... finds user by auth token and return a Promise, rejects in case of an error
  };
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: shared.dataSources,
  context: shared.context,
  subscriptions: {
    onConnect: (connectionParams, webSocket, context) => {
      console.log("Connected to the websocket 🔌");
    },
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url} 🚀`);
  console.log(`Subscriptions ready at ${subscriptionsUrl} 🚀`);
});
