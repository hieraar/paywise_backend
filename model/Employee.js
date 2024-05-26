const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  latestEducation: {
    type: String,
    required: true,
  },
  jobExperience: {
    type: String,
    required: true,
  },
  jobLocation: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
