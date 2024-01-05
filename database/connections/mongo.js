const mongoose = require("mongoose");
const configs = require("../../configs");
require("dotenv").config();

async function connectToDatabase(message = "") {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(configs.mongo.url);
    console.info(`Connect Mongo successfully ${message}`);
  } catch (error) {
    console.error(`Connect Mongo error ${message}`, error.message);
  }
}

module.exports = { connectToDatabase };
