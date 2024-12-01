const express = require("express");
const Company = require("../models/company");

const router = express.Router();

router.get("/dashboard", async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/logCommunication", async (req, res) => {
  const { companyId, type, date, notes } = req.body;
  console.log(req.body);
  try {
    const company = await Company.findById(companyId);
    company.communications.push({ type, date, notes });
    await company.save();
    res.status(200).json(company);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
