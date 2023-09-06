const gql = String.raw;

// GraphQL schema
export const schema = gql`
  type Category {
    id: String!
    name: String
  }

  type LinkedAccount {
    item_id: String!
    name: String!
    alias_name: String
    created_at: String!
  }

  type Query {
    getCategories(userId: String!): [Category!]!
    getLinkedAccounts(userId: String!): [LinkedAccount!]!
  }
`;
