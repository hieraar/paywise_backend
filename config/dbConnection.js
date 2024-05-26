require("dotenv").config();
const url = process.env.DB_URI;
const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    const res = await mongoose.connect(url);
    if (res) {
      console.log("Connected to database");
    }
  } catch (error) {
    console.log("Error connecting to database", error.message);
  }
};

module.exports = connectToDB;
