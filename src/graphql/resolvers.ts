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
    getLinkedAccounts: async (_: any, args: QueryGetLinkedAccountsArgs) => {
      const userId = args.userId;
      const linkedAccounts = await prisma.linkedAccount.findMany({
        where: {
          user_id: userId,
        },
        select: {
          alias_name: true,
          created_at: true,
          item_id: true,
          name: true,
        },
      });
      const linkedAccountsWithStringDate = linkedAccounts.map((linkedAccount) => {
        return {
          ...linkedAccount,
          created_at: linkedAccount.created_at.toISOString(),
        };
      });
      return linkedAccountsWithStringDate;
    },
  },
};
