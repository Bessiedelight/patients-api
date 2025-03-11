const Patient = require("../models/patient"); // Corrected to uppercase Patient

class PatientService {
  // Create a patient
  async createPatient(data) {
    const newPatient = new Patient(data); // Use a different variable name to avoid shadowing
    return await newPatient.save();
  }

  // Get all patients with pagination
  async getAllPatients(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await Patient.find().skip(skip).limit(limit).lean(); // Uses Patient correctly
  }

  // Get a patient by ID
  async getPatientById(id) {
    return await Patient.findById(id).lean();
  }

  // Update a patient
  async updatePatient(id, data) {
    return await Patient.findByIdAndUpdate(id, data, {
      new: true, // Return the updated document
      runValidators: true, // Validate updates against schema
    });
  }

  // Delete a patient
  async deletePatient(id) {
    return await Patient.findByIdAndDelete(id);
  }
}

module.exports = new PatientService();
