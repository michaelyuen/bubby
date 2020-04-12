const POST_ADDED = "POST_ADDED";

const { PubSub } = require("apollo-server");

const pubsub = new PubSub();

const resolvers = {
  Subscription: {
    postAdded: {
      subscribe: () => pubsub.asyncIterator([POST_ADDED]),
    },
  },
  Mutation: {
    addPost(root, args, context) {
      pubsub.publish(POST_ADDED, { postAdded: args });
      return postController.addPost(args);
    },
  },
};

module.exports = resolvers;
