import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { getSecrets } from './get-secrets';
require('dotenv').config();

import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

type PlaidSecrets = {
  PLAID_CLIENT_ID: string;
  PLAID_SECRET: string;
  PLAID_ENV: string;
  PLAID_PRODUCTS: string;
  PLAID_COUNTRY_CODES: string;
};

let plaidSecrets: Record<string, string> = {};

const getPlaidSecretFromAws = async () => {
  const secretName = 'sandbox/plaid';

  const client = new SecretsManagerClient({
    region: 'us-east-2',
  });

  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName,
        VersionStage: 'AWSCURRENT', // VersionStage defaults to AWSCURRENT if unspecified
      })
    );

    if (response.SecretString) {
      return JSON.parse(response.SecretString) as PlaidSecrets;
    }
    return {};
  } catch (error) {
    console.error(error);
    return {};
  }
};

// wait for the getPlaidSecretFromAws to resolve before continuing

getPlaidSecretFromAws().then((secrets) => {
  plaidSecrets = secrets;
  console.log('plaidSecrets:', plaidSecrets);
});

console.log('resolvedPlaidSecrets:', plaidSecrets);

const configuration = new Configuration({
  basePath: PlaidEnvironments[plaidSecrets.PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': plaidSecrets.PLAID_CLIENT_ID,
      'PLAID-SECRET': plaidSecrets.PLAID_SECRET,
      'Plaid-Version': '2020-09-14',
    },
  },
});

export const plaidClient = new PlaidApi(configuration);
