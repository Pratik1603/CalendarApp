const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  linkedInProfile: String,
  emails: [String],
  phoneNumbers: [String],
  comments: String,
  communicationPeriodicity: { type: String, default: "2 weeks" },
  communications: [
    {
      type: {
        type: String,
        enum: ["LinkedIn Post", "LinkedIn Message", "Email", "Phone Call", "Other"],
        required: true,
      },
      date: { type: Date, required: true },
      notes: String,
    },
  ],
});

companySchema.methods.getLastFiveCommunications = function () {
  return this.communications
    .sort((a, b) => new Date(b.date) - new Date(a.date)) 
    .slice(0, 5) 
    .map((communication) => ({
      type: communication.type,
      date: communication.date.toLocaleDateString(), 
    }));
};

companySchema.methods.isOverdue = function () {
  const lastCommunication = this.communications.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  const periodicityDays = parseInt(this.communicationPeriodicity.split(" ")[0]) || 14;
  return (
    lastCommunication &&
    new Date(lastCommunication.date).getTime() + periodicityDays * 86400000 < Date.now()
  );
};

companySchema.methods.isDueToday = function () {
  const lastCommunication = this.communications.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  const periodicityDays = parseInt(this.communicationPeriodicity.split(" ")[0]) || 14;
  const dueDate = new Date(lastCommunication.date).getTime() + periodicityDays * 86400000;
  const today = new Date();
  return (
    dueDate >= today.setHours(0, 0, 0, 0) &&
    dueDate < today.setHours(23, 59, 59, 999)
  );
};

companySchema.methods.getNextScheduledCommunication = function () {
  const lastCommunication = this.communications.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  const periodicityDays = parseInt(this.communicationPeriodicity.split(" ")[0]) || 14;

  if (!lastCommunication) {
    return null; 
  }

  const nextScheduledDate = new Date(lastCommunication.date);
  nextScheduledDate.setDate(nextScheduledDate.getDate() + periodicityDays); 

  return {
    type: lastCommunication.type,
    date: nextScheduledDate.toLocaleDateString(), 
  };
};

module.exports = mongoose.model("Company", companySchema);
