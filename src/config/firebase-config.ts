import admin from 'firebase-admin';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const getFirebaseSecret = async () => {
  const client = new SecretManagerServiceClient();
  const projectId = 'projects/437129560528/secrets/expense-core-auth/versions/1';
  const [version] = await client.accessSecretVersion({ name: projectId });
  const payload = (version?.payload?.data as Buffer)?.toString('utf8');
  if (payload) return JSON.parse(payload);
};

const initializeFirebaseApp = async () => {
  if (admin.apps.length === 0) {
    const serviceAccount = await getFirebaseSecret();
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
};

const auth = admin.auth;

export { admin, initializeFirebaseApp, auth };
