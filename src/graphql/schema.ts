const gql = String.raw;

// GraphQL schema
export const schema = gql`
  type Category {
    name: String
  }

  type Query {
    getCategories(userId: String!): [Category!]!
  }
`;
