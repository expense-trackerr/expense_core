const express = require("express");
const cors = require("cors");
const middleware = require("./auth-middleware");
const admin = require("./src/config/firebase-config");
const helmet = require("helmet");

const app = express();
const port = 3000;
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      fontSrc: ["'self'", "data:"],
      imgSrc: ["'self'", "data:"],
      styleSrc: ["'self'", "https:", "unsafe-inline"],
      scriptSrc: ["'self'", "https:", "unsafe-inline"],
    },
  })
);
app.use(cors());
app.use(middleware.decodeToken);

app.get("/api/todo", (req, res) => {
  res.json({
    todos: [
      {
        id: 1,
        title: "Todo One",
      },
      {
        id: 2,
        title: "Todo Two",
      },
      {
        id: 3,
        title: "Todo Three",
      },
    ],
  });
});

const startServer = async () => {
  await admin.initializeFirebaseApp();
  app.listen(port, () => {
    console.log(`Expense-core listening at http://localhost:${port}`);
  });
};

startServer();
