import { Prisma } from '@prisma/client';
import express from 'express';
import { CountryCode, Products, Transaction } from 'plaid';
import { plaidClient } from '../config/plaid-config';
import {
  getAccessTokenAndCursorFromItemId,
  removeItemId,
  saveRecordToLinkedAccounts,
  saveRecordToLinkedSubAccounts,
  updateAliasAccountName,
} from '../controller/linkedAccount';
import { UserInfoRequest } from '../utils/express-types';

const router = express.Router();
const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || Products.Transactions).split(',') as Products[];
const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || 'US, CA').split(',') as CountryCode[];
const PLAID_REDIRECT_URI = process.env.PLAID_REDIRECT_URI || '';

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

// Get the access token, institution name, and accounts and save it to the database
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

    // Get the accounts associated with the item
    const accountsResponse = await plaidClient.accountsGet({
      access_token: tokenResponse.data.access_token,
    });

    const itemId = accountsResponse.data.item.item_id;
    const institutionId = accountsResponse.data.item.institution_id;

    if (!institutionId) {
      return response.status(500).json({
        message: 'Unable to fetch the institution ID from Plaid. Please try again',
      });
    }

    // get the institution details and get the institution name
    const institutionInfo = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: PLAID_COUNTRY_CODES,
    });

    const institutionName = institutionInfo.data.institution.name;

    // save the itemID, accessToken, institutionName in the database
    const savedLinkedAccountToDatabase = await saveRecordToLinkedAccounts({
      userUid,
      itemId,
      accessToken: tokenResponse.data.access_token,
      institutionName,
    });

    if (!savedLinkedAccountToDatabase) {
      return response.status(500).json({
        message: 'Unable to save the access token in the database. Please try again',
      });
    }

    const mapSubAccountsResponse = accountsResponse.data.accounts.map((account) => ({
      accountId: account.account_id,
      name: account.name,
      balance: account.balances.current ? new Prisma.Decimal(account.balances.current) : null,
      itemId,
    }));

    const savedSubAccountsToDatabase = saveRecordToLinkedSubAccounts(mapSubAccountsResponse);

    if (!savedSubAccountsToDatabase) {
      return response.status(500).json({
        message: 'Unable to save the sub accounts in the database. Please try again',
      });
    }

    // Send the database response to the client
    return response.status(201).json({
      itemId,
    });
  } catch (error) {
    response
      .status(500)
      .json({ error: 'Error getting or setting the access token', message: (error as Error).message });
    next();
  }
});

// Remove the item associated with the access_token
router.post('/item/remove', async (request: UserInfoRequest, response, next) => {
  const { itemId }: { itemId: string } = request.body;
  const userUid = request.userUid;
  try {
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
    // Remove the item from the Plaid API
    await plaidClient.itemRemove({
      access_token: itemInfo.access_token,
    });
    // Remove the item from the database
    await removeItemId(itemId);

    response.status(200).json({ message: 'Item removed successfully' });
  } catch (error) {
    response.status(500).json({ error: 'Error removing the item', message: (error as Error).message });
    next();
  }
});

// Updates the Alias Account Name for an Item
router.put('/update_account_name', async (request: UserInfoRequest, response, next) => {
  const { accountName: newAccountName, itemId } = request.body;
  const userUid = request.userUid;

  // If user ID is not preset, return an error
  if (!userUid) {
    return response.status(400).json({
      message: 'User ID is not present. Ensure that you are logged in to the application',
    });
  }

  if (!newAccountName || !itemId) {
    return response.status(400).json({
      message: 'Account name or item ID is not present. Please try again',
    });
  }
  try {
    const resItemId = updateAliasAccountName(itemId, userUid, newAccountName);
    response.status(200).json({
      message: 'Account name updated successfully',
      itemId: resItemId,
    });
  } catch (error) {
    response.status(500).json({ error: 'Error updating the alias account name', message: (error as Error).message });
    next();
  }
});

module.exports = router;
