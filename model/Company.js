const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyEmail: {
    type: String,
    required: true,
  },
  companyPassword: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  companyAddress: {
    type: String,
    required: true,
  },
  companySector: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Company", companySchema);
