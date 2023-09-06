import { prisma } from '../config/database';

type LinkAccountData = {
  userUid: string;
  itemId: string;
  accessToken: string;
  institutionName: string;
};

export const setAccessToken = async (linkAccountData: LinkAccountData) => {
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

export const updateAliasAccountName = async (itemId: string, aliasAccountName: string) => {
  try {
    const res = await prisma.linkedAccount.update({
      where: {
        item_id: itemId,
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
