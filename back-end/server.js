import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectionCheck from "./db/connectionCheck.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
    connectionCheck();
    console.log(`Server is running on port ${PORT}`);
});

