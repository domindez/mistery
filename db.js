const mongoose = require("mongoose");
require("dotenv").config();




const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@misteryisland.ewtwovh.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected...");
  } catch (error) {
    console.err(error);
  }
}



module.exports = { connectDB };