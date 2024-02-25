const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user_id: {
    type: String,
    require: true,
    default: null,
  },
  amount: {
    type: Number,
    require: true,
    default: 0,
  },
  dateCreated: {
    type: Date,
    require: true,
    default: new Date(),
  },
  datedUpdated: {
    type: Date,
    require: true,
    default: new Date(),
  },
});
module.exports = mongoose.model("paymentSchema", paymentSchema, "payments");
