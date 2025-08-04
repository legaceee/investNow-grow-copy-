const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  name: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    enum: ["Tech", "Finance", "Healthcare", "Energy", "Consumer", "Other"],
    default: "Other",
  },
  currentPrice: {
    type: Number,
    required: true,
  },
  openPrice: {
    type: Number,
    required: true,
  },
  highPrice: {
    type: Number,
    required: true,
  },
  lowPrice: {
    type: Number,
    required: true,
  },
  previousClose: {
    type: Number,
    required: true,
  },
  marketCap: {
    type: Number,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Stock", stockSchema);
