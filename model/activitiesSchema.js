const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  message: {
    type: String,
    require: true,
    default: null,
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
module.exports = mongoose.model("activitySchema", activitySchema, "activities");
