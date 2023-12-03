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

export const initSecrets = async () => {
  plaidSecrets = await getPlaidSecretFromAws();
  return plaidSecrets;
};

export const getSecrets = () => {
  return plaidSecrets;
};
