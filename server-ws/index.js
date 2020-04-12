const { ApolloServer } = require("apollo-server");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
// const { context, dataSources } = require("../server/src/lambda/graphql");

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
  // context,
  // dataSources,
  context: async ({ req, connection }) => {
    if (connection) {
      // check connection for metadata
      return connection.context;
    } else {
      // check from req
      const token = req.headers.authorization || "";

      return { token };
    }
  },
  subscriptions: {
    onConnect: (connectionParams, webSocket, context) => {
      console.log("Connected to the websocket");
      // if (connectionParams.authToken) {
      //   return validateToken(connectionParams.authToken)
      //     .then(findUser(connectionParams.authToken))
      //     .then((user) => {
      //       return {
      //         currentUser: user,
      //       };
      //     });
      // }
      // throw new Error("Missing auth token!");
    },
    onDisconnect: (webSocket, context) => {
      // ...
    },
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
