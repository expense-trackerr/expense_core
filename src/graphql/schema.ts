const gql = String.raw;

// GraphQL schema
export const schema = gql`
  type User {
    id: String!
    name: String!
    email: String!
    categories: [Category!]!
  }

  type Category {
    id: String!
    name: String
  }

  type Query {
    getCategories(userId: String!): [Category!]!
  }
`;
