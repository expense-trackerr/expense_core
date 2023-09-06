import express from 'express';
import { CountryCode, Products, RemovedTransaction, Transaction, TransactionsSyncRequest } from 'plaid';
import { plaidClient } from '../config/plaid-config';
import { UserInfoRequest } from '../utils/express-types';
import { setAccessToken } from '../controller/plaid';

const router = express.Router();
let ACCESS_TOKEN = 'access-sandbox-565b0d29-b155-4bc7-b5fc-1275e050d721';
const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || Products.Transactions).split(',') as Products[];
const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || 'US').split(',') as CountryCode[];
const PLAID_REDIRECT_URI = process.env.PLAID_REDIRECT_URI || '';

const compareTxnsByDateAscending = (a: Transaction, b: Transaction) => {
  const aDate = new Date(a.date).valueOf();
  const bDate = new Date(b.date).valueOf();
  if (aDate > bDate) {
    return 1;
  } else if (aDate < bDate) {
    return -1;
  }
  return 0;
};

router.post('/create_link_token', async (request: UserInfoRequest, response, next) => {
  try {
    const configs = {
      user: {
        client_user_id: request.userUid || '',
      },
      // TODO: Get client name from Firebase
      client_name: 'Plaid Quickstart',
      products: PLAID_PRODUCTS,
      country_codes: PLAID_COUNTRY_CODES,
      language: 'en',
      ...(PLAID_REDIRECT_URI !== '' && { redirect_uri: PLAID_REDIRECT_URI }),
    };

    const createTokenResponse = await plaidClient.linkTokenCreate(configs);
    response.status(200).json(createTokenResponse.data);
  } catch (error) {
    console.error('Error creating link token:', error);
    next();
  }
});

router.post('/set_access_token', async (request: UserInfoRequest, response, next) => {
  const { publicToken }: { publicToken: string } = request.body;
  const userUid = request.userUid;

  // If user ID is not preset, return an error
  if (!userUid) {
    return response.status(400).json({
      message: 'User ID is not present. Ensure that you are logged in to the application',
    });
  }

  try {
    // get the access token
    const tokenResponse = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    // get the information about the item
    const itemInfo = await plaidClient.itemGet({
      access_token: tokenResponse.data.access_token,
    });

    const institutionId = itemInfo.data.item.institution_id;

    if (!institutionId) {
      return response.status(500).json({
        message: 'Unable to fetch the institution ID from Plaid. Please try again',
      });
    }

    // get the institution details and get the name
    const institutionInfo = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: PLAID_COUNTRY_CODES,
    });

    const institutionName = institutionInfo.data.institution.name;

    // save the access token in the database
    const databaseResponse = await setAccessToken({
      userUid,
      itemId: tokenResponse.data.item_id,
      accessToken: tokenResponse.data.access_token,
      institutionName,
    });
    console.log('databaseResponse:', databaseResponse);

    if (!databaseResponse) {
      return response.status(500).json({
        message: 'Unable to save the access token in the database. Please try again',
      });
    }

    return response.json({
      item_id: databaseResponse,
    });
  } catch (error) {
    response
      .status(500)
      .json({ error: 'Error getting or setting the access token', message: (error as Error).message });
    next();
  }
});

router.get('/transactions', async (request, response, next) => {
  try {
    let cursor = undefined;

    // New transaction updates since "cursor"
    let added: Transaction[] = [];
    let modified: Transaction[] = [];
    // Removed transaction ids
    let removed: RemovedTransaction[] = [];
    let hasMore = true;
    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      const transactionsRequest: TransactionsSyncRequest = {
        access_token: ACCESS_TOKEN,
        cursor: cursor,
      };
      const transactions = await plaidClient.transactionsSync(transactionsRequest);
      console.log('transactions:', transactions);
      const data = transactions.data;
      // Add this page of results
      added = added.concat(data.added);
      modified = modified.concat(data.modified);
      removed = removed.concat(data.removed);
      hasMore = data.has_more;
      // Update cursor to the next cursor
      cursor = data.next_cursor;
    }

    const recentlyAdded = [...added].sort(compareTxnsByDateAscending);
    response.json({ latest_transactions: recentlyAdded });
  } catch (error) {
    console.error('Error getting transactions:', error);
    next();
  }
});

// Remove the item associated with the access_token
router.post('/item/remove', async (request: UserInfoRequest, response, next) => {
  // const userId = request.userUid;
  // FIXME - Get the access token from the DB
  const accessToken = ACCESS_TOKEN;
  try {
    const removeItemResponse = await plaidClient.itemRemove({
      access_token: accessToken,
    });
    response.status(200).json(removeItemResponse.data);
  } catch (error) {
    response.status(500).json({ error: 'Error removing the item', message: (error as Error).message });
    next();
  }
});

module.exports = router;
