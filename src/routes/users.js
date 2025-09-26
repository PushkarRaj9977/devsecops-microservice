import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  const users = await User.find().select("-__v");
  res.json(users);
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
