const { ApolloServer } = require("apollo-server");
const resolvers = require("./resolvers");
const typeDefs = require("./schema");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    onConnect: (connectionParams, webSocket, context) => {
      console.log("Connected to the websocket 🔌");
    },
  },
  introspection: true,
  playground: true,
});

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url} 🚀`);
    console.log(`Subscriptions ready at ${subscriptionsUrl} 🚀`);
  });
