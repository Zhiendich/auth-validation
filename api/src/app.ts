import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/router.js";
import mongoose from "mongoose";

const app: Application = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/api", router);
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL || "")
      .then(() => {
        console.log("Db connected");
      })
      .catch((error) => {
        console.log("Db error", error);
      });
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
