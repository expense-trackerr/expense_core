import { prisma } from '../config/database';
import { QueryGetCategoriesArgs, Resolvers, QueryGetLinkedAccountsArgs } from './generatedGraphqlTypes';

export const resolvers: Resolvers = {
  Query: {
    getCategoryColors: async () => {
      const categoryColors = await prisma.categoryColor.findMany({
        select: {
          id: true,
          name: true,
          hex_code: true,
        },
      });
      return categoryColors;
    },

    // Gets al the categories for a user
    getCategories: async (_: any, args: QueryGetCategoriesArgs) => {
      const userId = args.userId;
      const categories = await prisma.category.findMany({
        where: {
          user_id: userId,
        },
        select: {
          id: true,
          name: true,
          budget: true,
          category_type: {
            select: {
              name: true,
            },
          },
          category_color: {
            select: {
              hex_code: true,
            },
          },
        },
      });

      return categories.map((category) => ({
        ...category,
        category_type: category.category_type.name,
        category_color: category.category_color.hex_code,
      }));
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
          created_at: true,
          linked_sub_accounts: {
            select: {
              account_id: true,
              balance: true,
              name: true,
              alias_name: true,
            },
          },
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
