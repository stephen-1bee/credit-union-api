const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    require: true,
    default: null,
  },
  email: {
    type: String,
    require: true,
    default: null,
  },
  password: {
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

module.exports = mongoose.model("userSchema", userSchema, "users");
