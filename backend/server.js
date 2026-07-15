const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/orders", orderRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Test Route
app.get("/", (req, res) => {
    res.send("Backend is running...");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});