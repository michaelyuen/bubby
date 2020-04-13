const MESSAGE_ADDED = "messageAdded";

const { PubSub } = require("apollo-server");

const pubsub = new PubSub();

const resolvers = {
  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator([MESSAGE_ADDED]),
    },
  },
  Mutation: {
    addMessage: async (_, args, { dataSources: { firebaseAdmin } }) => {
      pubsub.publish(MESSAGE_ADDED, { [MESSAGE_ADDED]: args });
      // return firebaseAdmin.addMessage(args);
    },
  },
};

module.exports = resolvers;
