import express from "express";
import { UserAuthInfoRequest } from "../../express-types";
import db from "../../database";

const router = express.Router();

router.post("/create", async (req: UserAuthInfoRequest, res) => {
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
router.post("/delete", async (req: UserAuthInfoRequest, res) => {
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

module.exports = router;
