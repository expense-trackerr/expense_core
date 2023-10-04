import express from 'express';
import { RemovedTransaction, Transaction, TransactionsSyncRequest } from 'plaid';
import { plaidClient } from '../../config/plaid-config';
import { getAccessTokenAndCursorFromItemId } from '../../controller/linkedAccount';
import { UserInfoRequest } from '../../utils/express-types';

const router = express.Router();

type TransactionsAllData = {
  added: Transaction[];
  modified: Transaction[];
  removed: RemovedTransaction[];
  nextCursor: string | undefined;
};

// Retrieve Transactions for an Item
router.get('/transactions/:item_id', async (request: UserInfoRequest, response, next) => {
  const { item_id: itemId } = request.params;
  const userUid = request.userUid;
  try {
    // If user ID is not preset, return an error
    if (!userUid) {
      return response.status(400).json({
        message: 'User ID is not present. Ensure that you are logged in to the application',
      });
    }
    // Get the access token
    const itemInfo = await getAccessTokenAndCursorFromItemId(itemId, userUid);
    if (!itemInfo) {
      return response.status(400).json({
        message: 'No linked account found for the given item ID',
      });
    }
    if (!itemInfo.access_token) {
      return response.status(400).json({
        message: 'Access token is not present for the given Item ID. Please try again',
      });
    }

    const allData: TransactionsAllData = {
      added: [],
      modified: [],
      removed: [],
      nextCursor: undefined,
    };

    let hasMore = true;
    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      const transactionsRequest: TransactionsSyncRequest = {
        access_token: itemInfo.access_token,
        cursor: allData.nextCursor,
      };
      const transactions = await plaidClient.transactionsSync(transactionsRequest);
      const newData = transactions.data;

      allData.added = allData.added.concat(newData.added);
      allData.modified = allData.modified.concat(newData.modified);
      allData.removed = allData.removed.concat(newData.removed);
      hasMore = newData.has_more;
      // Update cursor to the next cursor
      allData.nextCursor = newData.next_cursor;
    }

    // const recentlyAdded = [...added].sort(compareTxnsByDateAscending);
    return response.status(200).json(allData);
  } catch (error) {
    console.error('Error getting transactions:', error);
    next();
  }
});

module.exports = router;
