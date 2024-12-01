const mongoose = require("mongoose");

const communicationMethodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  sequence: Number,
  mandatory: { type: Boolean, default: false },
});

module.exports = mongoose.model("CommunicationMethod", communicationMethodSchema);
