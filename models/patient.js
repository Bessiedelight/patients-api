const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    summary: {
      type: String,
      required: [true, "Summary is required"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Patient", patientSchema);
