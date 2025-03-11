require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const patientRoutes = require("./routes/patientRoutes"); // Import the routes

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Mount the patient routes under a base path
app.use("/api/patients", patientRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
