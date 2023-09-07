import { prisma } from '../config/database';
import { QueryGetCategoriesArgs, Resolvers, QueryGetLinkedAccountsArgs } from './generatedGraphqlTypes';

export const resolvers: Resolvers = {
  Query: {
    getCategories: async (_: any, args: QueryGetCategoriesArgs) => {
      const userId = args.userId;
      const categories = await prisma.category.findMany({
        where: {
          user_id: userId,
        },
        select: {
          id: true,
          name: true,
        },
      });
      return categories;
    },
    // Gets all linked accounts and sub accounts for a user
    getLinkedAccounts: async (_: any, args: QueryGetLinkedAccountsArgs) => {
      const userId = args.userId;
      const linkedAccounts = await prisma.linkedAccount.findMany({
        where: {
          user_id: userId,
        },
        select: {
          alias_name: true,
          item_id: true,
          name: true,
          linked_sub_accounts: {
            select: {
              account_id: true,
              balance: true,
              name: true,
              alias_name: true,
              created_at: true,
            },
          },
        },
      });
      const linkedAccountsWithStringDate = linkedAccounts.map((linkedAccount) => {
        return {
          ...linkedAccount,
          linked_sub_accounts: linkedAccount.linked_sub_accounts.map((linkedSubAccount) => ({
            ...linkedSubAccount,
            created_at: linkedSubAccount.created_at.toISOString(),
          })),
        };
      });

      return linkedAccountsWithStringDate;
    },
  },
};
