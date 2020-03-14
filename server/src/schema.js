const { gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Query {
    currentUser: User
    sendEmailVerification: String
    sendPasswordResetEmail(email: String!): String
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
  }

  type User {
    email: String!
    emailVerified: Boolean!
    firstName: String!
    lastName: String!
  }
`;

module.exports = typeDefs;
