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
    linked_sub_accounts: [LinkedSubAccount!]!
  }

  type LinkedSubAccount {
    account_id: String!
    name: String!
    alias_name: String
    balance: Float
    created_at: String!
  }

  type Query {
    getCategories(userId: String!): [Category!]!
    getLinkedAccounts(userId: String!): [LinkedAccount!]!
  }
`;
