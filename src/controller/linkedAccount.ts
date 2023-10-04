import { Prisma } from '@prisma/client';
import { prisma } from '../config/database';

type LinkAccountData = {
  userUid: string;
  itemId: string;
  accessToken: string;
  institutionName: string;
};

type LinkedSubAccountData = {
  accountId: string;
  itemId: string;
  name: string;
  balance: Prisma.Decimal | null;
};

export const saveRecordToLinkedAccounts = async (linkAccountData: LinkAccountData) => {
  const { userUid, itemId, accessToken, institutionName } = linkAccountData;

  try {
    // Add the linked account to the database
    await prisma.linkedAccount.create({
      data: {
        item_id: itemId,
        access_token: accessToken,
        user_id: userUid,
        name: institutionName,
      },
    });

    return itemId;
  } catch (error) {
    console.error('Error adding linked account to database:', error);
  }
};

export const saveRecordToLinkedSubAccounts = async (linkSubAccountData: LinkedSubAccountData[]) => {
  const mapDataToLinkedSubAccounts = linkSubAccountData.map((item) => ({
    account_id: item.accountId,
    linked_account_item_id: item.itemId,
    name: item.name,
    balance: item.balance,
  }));

  try {
    // Add the linked sub accounts to the database
    const dbRes = await prisma.linkedSubAccount.createMany({
      data: mapDataToLinkedSubAccounts,
    });

    if (dbRes.count === linkSubAccountData.length) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding linked account to database:', error);
    return false;
  }
};

// Question: How to throw an error here that is caught by the catch block in the route?
// Additionally, put the logic for checking !linkedAccount in here
export const getAccessTokenAndCursorFromItemId = async (itemId: string, userUid: string) => {
  try {
    const linkedAccount = await prisma.linkedAccount.findUnique({
      where: {
        item_id: itemId,
        user_id: userUid,
      },
      select: {
        access_token: true,
        last_cursor: true,
      },
    });
    if (!linkedAccount) {
      console.error('No linked account found for the given item ID');
      return;
    }
    return linkedAccount;
  } catch (error) {
    console.error('Error getting access token:', error);
  }
};

export const updateAliasAccountName = async (itemId: string, userId: string, aliasAccountName: string) => {
  try {
    const res = await prisma.linkedAccount.update({
      where: {
        item_id: itemId,
        user_id: userId,
      },
      data: {
        alias_name: aliasAccountName,
      },
    });
    return res.item_id;
  } catch (error) {
    console.error('Error updating alias account name:', error);
  }
};

// Removes the item ID and all associated data from the database
export const removeItemId = async (itemId: string) => {
  try {
    const res = await prisma.linkedAccount.delete({
      where: {
        item_id: itemId,
      },
    });
    return res.item_id;
  } catch (error) {
    console.error(`Error deleting the item with item ID: ${itemId}`, error);
  }
};
