const resolvers = {
  Query: {
    currentUser: async (_, __, { dataSources: { firebaseAdmin } }) =>
      firebaseAdmin.getCurrentUser(),
    sendEmailVerification: async (_, __, { dataSources }) => {
      const { firebaseAdmin, firebaseClient } = dataSources;
      const customToken = await firebaseAdmin.getCustomToken();
      return firebaseClient.sendEmailVerification(customToken);
    },
    sendPasswordResetEmail: async (_, { email }) =>
      firebaseClient.sendPasswordResetEmail(email),
    messages: async (_, args, { dataSources: { firebaseClient } }) => {
      return firebaseClient.getMessages();
    },
  },
  Mutation: {
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
    ) => firebaseClient.verifyPasswordResetCode(code),
  },
};

module.exports = resolvers;
