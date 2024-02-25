const mongoose = require("mongoose");

const con = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/creditunion");
    console.log("dev db connection establised");
  } catch (err) {
    console.log(err);
  }
};

module.exports = con;
