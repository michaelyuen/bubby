const { gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Subscription {
    posts: [Post]
  }

  type Query {
    currentUser: User
    sendEmailVerification: String
    sendPasswordResetEmail(email: String!): String
    posts: [Post]
  }

  type Mutation {
    confirmPasswordReset(code: String!, newPassword: String!): String
    deleteUser: String
    login(email: String!, password: String!): String
    signup(
      email: String!
      firstName: String!
      lastName: String!
      password: String!
    ): String
    verifyEmail(code: String!): String
    verifyPasswordResetCode(code: String!): String
    addPost(author: String, comment: String): Post
  }

  type User {
    email: String!
    emailVerified: Boolean!
    firstName: String!
    lastName: String!
  }

  type Post {
    author: String
    comment: String
  }
`;

module.exports = typeDefs;
