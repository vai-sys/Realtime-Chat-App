import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const databaseURL = process.env.DATABASE_URL;


app.use(cors({
  origin: [process.env.ORIGIN],
  methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
  credentials: true
}));

app.use(express.json()); 
app.use(cookieParser());


mongoose.connect(databaseURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
