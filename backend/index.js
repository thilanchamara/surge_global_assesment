import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import dbConnect from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
dotenv.config();
dbConnect();

const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

mongoose.connection.once("open", () => {
  console.log("connected to the db");
  app.listen(PORT, () => {
    console.log("server is running on PORT 3500");
  });
});
