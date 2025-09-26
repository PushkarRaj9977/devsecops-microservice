import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

// Routes
import health from "./routes/health.js";
import users from "./routes/users.js";
app.use("/health", health);
app.use("/users", users);

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => console.log(`API running on :${port}`));
  })
  .catch(err => {
    console.error("MongoDB connection error", err);
    process.exit(1);
  });
