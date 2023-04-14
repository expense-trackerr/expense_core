const { auth } = require("./src/config/firebase-config");

async function decodeToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Authorization header is missing.");
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodeValue = await auth().verifyIdToken(token);
    if (decodeValue) {
      req.user = decodeValue;
      req.userUid = decodeValue.uid;
      return next();
    }
    return res.status(401).json({ message: "Unauthorized" });
  } catch (error) {
    return res.json({ message: error.message });
  }
}

module.exports = decodeToken;
