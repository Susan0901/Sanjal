import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.listen(PORT, () => {
  console.log(`Successfully running on PORT: ${PORT}`);
});
