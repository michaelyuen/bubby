const { DataSource } = require("apollo-datasource");
const {
  ApolloError,
  AuthenticationError,
  ForbiddenError
} = require("apollo-server-lambda");

class FirebaseAdmin extends DataSource {
  constructor({ admin }) {
    super();
    this.admin = admin;
    this.db = admin.firestore();
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  async createUser(uid, args) {
    try {
      const { email, firstName, lastName } = args;
      await this.db.doc(`users/${uid}`).set({
        email,
        firstName,
        lastName,
        uid
      });
      return "🛸";
    } catch (error) {
      console.error(error);
      throw new ApolloError(`Create User Error: ${error.message}`);
    }
  }

  async deleteUser() {
    if (!this.context.user) {
      throw new ForbiddenError("Operation requires authenticated user");
    }
    try {
      this.db.doc(`users/${this.context.user.uid}`).delete();
      await this.admin.auth().deleteUser(this.context.user.uid);
      return "🛸";
    } catch (error) {
      console.error(error);
      throw new ApolloError(`Delete User Error: ${error.message}`);
    }
  }

  async getCurrentUser() {
    if (!this.context.user) {
      return null;
    }
    try {
      const dbUser = await this.db.doc(`users/${this.context.user.uid}`).get();
      return {
        ...dbUser.data(),
        emailVerified: this.context.user.emailVerified
      };
    } catch (error) {
      console.error(error);
      throw new ApolloError(error.message);
    }
  }

  async getCustomToken() {
    if (!this.context.user) {
      throw new AuthenticationError("Operation requires authenticated user");
    }
    try {
      return await this.admin.auth().createCustomToken(this.context.user.uid);
    } catch (error) {
      console.error(error);
      throw new ApolloError(error.message);
    }
  }
}

module.exports = FirebaseAdmin;
