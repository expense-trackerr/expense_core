const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;
app.use(cors());

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
