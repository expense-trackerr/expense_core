import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { getSecrets } from './get-secrets';
require('dotenv').config();

const resolvedPlaidSecrets = getSecrets();
console.log('resolvedPlaidSecrets:', resolvedPlaidSecrets);

const configuration = new Configuration({
  basePath: PlaidEnvironments[resolvedPlaidSecrets.PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': resolvedPlaidSecrets.PLAID_CLIENT_ID,
      'PLAID-SECRET': resolvedPlaidSecrets.PLAID_SECRET,
      'Plaid-Version': '2020-09-14',
    },
  },
});

export const plaidClient = new PlaidApi(configuration);
