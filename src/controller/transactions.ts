import { prisma } from '../config/database';
import { SimpleTransaction } from '../routes/plaid/transactions';

export const addNewTransactions = async (transactionData: SimpleTransaction[]) => {
  const mapDataToTransactions = transactionData.map((item) => ({
    id: item.transactionId,
    user_id: item.userId,
    linked_sub_account_id: item.accountId,
    currency: item.currencyCode,
    amount: item.amount,
    name: item.name,
    date: item.date,
    pending: item.pending,
  }));

  try {
    // Add the transactions to the database
    const dbRes = await prisma.transaction.createMany({
      data: mapDataToTransactions,
    });

    if (dbRes.count === transactionData.length) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding transactions to database:', error);
    return false;
  }
};

export const modifyTransactions = async (transactionData: SimpleTransaction[]) => {
  const mapDataToTransactions = transactionData.map((item) => ({
    id: item.transactionId,
    user_id: item.userId,
    linked_sub_account_id: item.accountId,
    currency: item.currencyCode,
    amount: item.amount,
    name: item.name,
    date: item.date,
    pending: item.pending,
  }));

  try {
    // Update the transactions in the database
    const dbRes = await prisma.transaction.updateMany({
      where: {
        id: {
          in: mapDataToTransactions.map((item) => item.id),
        },
      },
      data: mapDataToTransactions,
    });

    if (dbRes.count === transactionData.length) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating transactions in database:', error);
    return false;
  }
};
