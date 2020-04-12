const { gql } = require("apollo-server");

const typeDefs = gql`
  type Subscription {
    messageAdded: Message
  }

  type Mutation {
    addMessage(author: String, comment: String): Message
  }

  type Message {
    author: String
    comment: String
  }
`;

module.exports = typeDefs;
