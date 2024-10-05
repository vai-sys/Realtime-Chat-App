

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routers/AuthRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import contactRoutes from "./routers/ContactRoute.js"
import setupSocket from "./socket.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const databaseURL = process.env.DATABASE_URL;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: process.env.ORIGIN, 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/uploads/profiles", express.static(path.join(__dirname, "uploads", "profiles")));

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

app.use("/api/auth", authRoutes);
app.use("/api/contacts",contactRoutes)

const server=app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

setupSocket(server)