import { gql } from 'apollo-server-express';

// GraphQL schema
export const schema = gql`
  type Category {
    name: String
  }

  type User {
    name: String!
    age: Int!
  }

  type Query {
    getCategories(userId: String!): [Category!]!
    getUser(age: Int!): [User!]!
  }
`;
