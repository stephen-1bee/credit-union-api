const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  user_id: {
    type: String,
    require: true,
    default: null,
  },
  messages: {
    type: String,
    require: true,
    default: null,
  },
  isApproved: {
    type: Boolean,
    require: true,
    default: false,
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
module.exports = mongoose.model("requestSchema", requestSchema, "requests");
