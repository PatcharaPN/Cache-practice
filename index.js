import express from "express";
import bodyparser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./src/configs/db/db.js";
import { connectRadis } from "./src/configs/db/cache.js";
import userRoutes from "./src/routes/userRoute.js";

dotenv.config();

const app = express();
app.use(bodyparser.json());
const port = 8080;

connectDB();
connectRadis(); // Connect to Redis

app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
