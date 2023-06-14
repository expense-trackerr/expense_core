import express from "express";
import cors from "cors";
import { decodeToken } from "./auth-middleware";
import { initializeFirebaseApp } from "./src/config/firebase-config";
import helmet from "helmet";
import db from "./database";
import { UserAuthInfoRequest } from "./express-types";
const categories = require("./src/routes/categories");
const todo = require("./src/routes/todo");

const app = express();
const port = 3000;
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(decodeToken);
app.use("/api/categories", categories);
app.use("/api/todo", todo);

// app.get("/api/todo", (req, res) => {
//   res.json({
//     todos: [
//       {
//         id: 1,
//         title: "Todo One",
//       },
//       {
//         id: 2,
//         title: "Todo Two",
//       },
//       {
//         id: 3,
//         title: "Todo Three",
//       },
//     ],
//   });
// });

//DB
// Creates entries in the categories table

const startServer = async () => {
  await initializeFirebaseApp();
  app.listen(port, () => {
    console.log(`Expense-core listening at http://localhost:${port}`);
  });
};

startServer();
