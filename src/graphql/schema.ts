import { gql } from 'apollo-server-express';

// GraphQL schema
export const schema = gql`
  type Query {
    hello: String
  }
`;
