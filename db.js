const mongoose = require("mongoose");
require("dotenv").config();


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected...");
  } catch (error) {
    console.err(error);
  }
}

module.exports = { connectDB };