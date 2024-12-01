const express = require("express");
const Company = require("../models/company");
const CommunicationMethod = require("../models/communicationMethod");

const router = express.Router();

// Company Management
router.post("/addCompany", async (req, res) => {
  const newCompany = new Company(req.body);
  try {
    const savedCompany = await newCompany.save();
    res.status(200).json(savedCompany);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCompany = await Company.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCompany) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.status(200).json(updatedCompany);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the company" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCompany = await Company.findByIdAndDelete(id);
    if (!deletedCompany) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete the company" });
  }
});

router.get("/getCompanies", async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/addCommunicationMethod", async (req, res) => {
  const newMethod = new CommunicationMethod(req.body);
  try {
    const savedMethod = await newMethod.save();
    res.status(200).json(savedMethod);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/getCommunicationMethods", async (req, res) => {
  try {
    const methods = await CommunicationMethod.find().sort("sequence");
    res.status(200).json(methods);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
