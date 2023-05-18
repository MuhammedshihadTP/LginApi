const mongoose = require("mongoose");

const userSchma = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  wrongAttempts: { type: Number, default: 0 },
  blockedUntil: { type: Date }
});

module.exports = mongoose.model("user", userSchma);
