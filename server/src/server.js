import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config(); // loads .env variabes into process.env

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json()); // parse request bodies
app.use(express.urlencoded({ extended: true })); // parse form-data
app.use(cookieParser()); // parse cookies

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "Development"
        ? process.env.CLIENT_DEV_URL
        : process.env.CLIENT_PROD_URL,
    methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// routes
app.use("/api/auth", authRoutes);

// connecting MONGO_DB
connectDB().then(
  app.listen(PORT, () => {
    console.log(`Successfully running on PORT: ${PORT}`);
  })
);
