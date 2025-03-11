const patientService = require("../services/patientService");

class PatientController {
  async createPatient(req, res) {
    try {
      const patient = await patientService.createPatient(req.body);
      res.status(201).json(patient);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllPatients(req, res) {
    try {
      const { page, limit } = req.query;
      const patients = await patientService.getAllPatients(
        parseInt(page),
        parseInt(limit)
      );
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getPatient(req, res) {
    try {
      const patient = await patientService.getPatientById(req.params.id);
      if (!patient)
        return res.status(404).json({ message: "Patient not found" });
      res.status(200).json(patient);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updatePatient(req, res) {
    try {
      const patient = await patientService.updatePatient(
        req.params.id,
        req.body
      );
      if (!patient)
        return res.status(404).json({ message: "Patient not found" });
      res.status(200).json(patient);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deletePatient(req, res) {
    try {
      const patient = await patientService.deletePatient(req.params.id);
      if (!patient)
        return res.status(404).json({ message: "Patient not found" });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new PatientController();
