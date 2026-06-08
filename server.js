const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("E-Commerce Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});