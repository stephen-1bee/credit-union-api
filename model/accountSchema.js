const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  account_name: {
    type: String,
    require: true,
    default: null,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    require: true,
    default: null,
  },
  account_number: {
    type: String,
    require: true,
    default: null,
  },
  balance: {
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
module.exports = mongoose.model("accountSchema", accountSchema, "account");
