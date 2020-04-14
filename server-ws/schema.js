const { gql } = require("apollo-server");

const typeDefs = gql`
  type Subscription {
    messageAdded: Message
  }

  type Query {
    messages: [Message]
  }

  type Mutation {
    addMessage(author: String, message: String): Message
  }

  type Message {
    author: String
    message: String
  }
`;

module.exports = typeDefs;
