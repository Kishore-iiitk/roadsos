require("dotenv").config();

const express = require("express");

const connectDB = require("./config/db");

const sosRoutes = require("./routes/sosRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use("/api/sos", sosRoutes);

app.get("/", (req, res) => {
  res.send("RoadSoS Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});