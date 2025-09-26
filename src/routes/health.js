import express from "express";
const router = express.Router();

router.get("/", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

export default router;
