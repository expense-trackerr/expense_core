import { prisma } from '../config/database';
import {
  QueryGetCategoriesArgs,
  Resolvers,
  QueryGetLinkedAccountsArgs,
  QueryGetTransactionsArgs,
} from './generatedGraphqlTypes';

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
          deleted: true,
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

      // Filter out deleted categories
      const filteredCategories = categories.filter((category) => !category.deleted);

      return filteredCategories.map((category) => ({
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

    // Gets all transactions for a user
    getTransactions: async (_: any, args: QueryGetTransactionsArgs) => {
      const userId = args.userId;
      const transactions = await prisma.transaction.findMany({
        where: {
          user_id: userId,
        },
        select: {
          id: true,
          date: true,
          name: true,
          amount: true,
          pending: true,
          currency: true,
          category: {
            select: {
              id: true,
              name: true,
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
          },
          linked_sub_account: {
            select: {
              account_id: true,
              name: true,
              alias_name: true,
            },
          },
        },
      });

      const transformedTxns = transactions.map((txn) => {
        return {
          ...txn,
          category: txn.category
            ? {
                ...txn.category,
                category_color: txn?.category?.category_color.hex_code,
                category_type: txn?.category?.category_type.name,
              }
            : null,
        };
      });

      return transformedTxns;
    },
  },
};
