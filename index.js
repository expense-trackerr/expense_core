const express = require("express");
const cors = require("cors");
const middleware = require("./auth-middleware");

const app = express();
const port = 3000;
app.use(cors());
app.use(middleware.decodeToken);

app.get("/api/todo", (req, res) => {
  console.log(req.headers);

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

app.listen(port, () => {
  console.log(`Expense-core listening at http://localhost:${port}`);
});
