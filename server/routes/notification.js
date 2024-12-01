const express = require("express");
const router = express.Router();
const Company = require("../models/company");

router.get("/", async (req, res) => {
    try {
      const companies = await Company.find();
      console.log("Fetched companies:", companies);
      const notifications = {
        overdue: companies.filter((c) => c.isOverdue()).map((c) => ({ companyId: c._id, companyName: c.name })),
        today: companies.filter((c) => c.isDueToday()).map((c) => ({ companyId: c._id, companyName: c.name })),
        count: companies.filter((c) => c.isOverdue() || c.isDueToday()).length,
      };
      console.log("Generated notifications:", notifications);
      res.json(notifications);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      res.status(500).send("Error fetching notifications");
    }
  });
  

module.exports = router;
