
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT, {});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

module.exports = connectToDB;
