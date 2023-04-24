import express from "express";
import cors from "cors";
import { decodeToken } from "./auth-middleware";
import { initializeFirebaseApp } from "./src/config/firebase-config";
import helmet from "helmet";
import db from "./database";
import { UserAuthInfoRequest } from "./express-types";

const app = express();
const port = 3000;
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(decodeToken);

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

//DB
// Creates entries in the categories table
app.post("/api/categories", async (req: UserAuthInfoRequest, res) => {
  const { categories }: { categories: string[] } = req.body;
  console.log("categories:", categories);
  const userUid = req.userUid;
  try {
    const insertPromises = categories.map((category) => {
      return db.query("INSERT INTO categories (name, user_uid) VALUES (?, ?)", [
        category,
        userUid,
      ]);
    });
    await Promise.all(insertPromises);
    res.status(201).json({ message: "Category created successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// DB
// Deletes entries in the categories table
app.post("/api/categories-delete", async (req: UserAuthInfoRequest, res) => {
  const { categories }: { categories: string | string[] } = req.body;
  const userUid = req.userUid;
  try {
    if (typeof categories === "string") {
      await db.query("DELETE FROM categories WHERE name = ? AND user_uid = ?", [
        categories,
        userUid,
      ]);
    } else {
      const deletePromises = categories.map((category) => {
        return db.query(
          "DELETE FROM categories WHERE name = ? AND user_uid = ?",
          [category, userUid]
        );
      });
      await Promise.all(deletePromises);
    }
    res.status(201).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

const startServer = async () => {
  await initializeFirebaseApp();
  app.listen(port, () => {
    console.log(`Expense-core listening at http://localhost:${port}`);
  });
};

startServer();
