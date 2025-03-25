require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import cors
const patientRoutes = require("./routes/patientRoutes"); // Import the routes

const app = express();

// Define CORS options if you need to customize them.
const corsOptions = {
  origin: '*', // Allow requests from any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Enable CORS using the options.
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Middleware to parse JSON requests.
app.use(express.json());

// Mount the patient routes under a base path.
app.use("/api/patients", patientRoutes);

// Connect to MongoDB.
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase to 30 seconds
    heartbeatFrequencyMS: 10000, // Check connection every 10 seconds
    autoIndex: false,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Start the server.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
