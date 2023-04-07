const admin = require("firebase-admin");
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");

const getFirebaseSecret = async () => {
  const client = new SecretManagerServiceClient();
  const projectId =
    "projects/437129560528/secrets/expense-core-auth/versions/1";
  const [version] = await client.accessSecretVersion({ name: projectId });
  const payload = version.payload.data.toString("utf8");
  return JSON.parse(payload);
};

const initializeFirebaseApp = async () => {
  const serviceAccount = await getFirebaseSecret();

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
};

initializeFirebaseApp();

module.exports = admin;
