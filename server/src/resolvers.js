const { PubSub } = require("apollo-server-lambda");

const pubsub = new PubSub();

const resolvers = {
  Subscription: {
    postAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([POST_ADDED])
    }
  },
  Query: {
    currentUser: async (_, __, { dataSources: { firebaseAdmin } }) =>
      firebaseAdmin.getCurrentUser(),
    sendEmailVerification: async (_, __, { dataSources }) => {
      const { firebaseAdmin, firebaseClient } = dataSources;
      const customToken = await firebaseAdmin.getCustomToken();
      return firebaseClient.sendEmailVerification(customToken);
    },
    sendPasswordResetEmail: async (
      _,
      { email },
      { dataSources: { firebaseClient } }
    ) => firebaseClient.sendPasswordResetEmail(email),
    posts(root, args, context) {
      return postController.posts();
    }
  },
  Mutation: {
    addPost(root, args, context) {
      pubsub.publish(POST_ADDED, { postAdded: args });
      return postController.addPost(args);
    },
    confirmPasswordReset: async (
      _,
      { code, newPassword },
      { dataSources: { firebaseClient } }
    ) => await firebaseClient.confirmPasswordReset(code, newPassword),
    deleteUser: async (_, __, { dataSources: { firebaseAdmin } }) =>
      firebaseAdmin.deleteUser(),
    login: async (_, args, { dataSources: { firebaseClient } }) =>
      await firebaseClient.login(args),
    signup: async (_, args, { dataSources }) => {
      const { firebaseAdmin, firebaseClient } = dataSources;
      const user = await firebaseClient.signup(args);
      firebaseAdmin.createUser(user.uid, args);
      return user.getIdToken();
    },
    verifyEmail: async (_, { code }, { dataSources: { firebaseClient } }) =>
      firebaseClient.verifyEmail(code),
    verifyPasswordResetCode: async (
      _,
      { code },
      { dataSources: { firebaseClient } }
    ) => firebaseClient.verifyPasswordResetCode(code)
  }
};

module.exports = resolvers;
