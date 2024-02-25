const mongoose = require("mongoose");

const con = async () => {
  try {
    await mongoose.connect(
      process.env.ROOM === "dev"
        ? process.env.DEV_DB
        : process.env.ROOM === "prod"
        ? process.env.PROD_DB
        : null
    );

    if (process.env.ROOM === "dev") {
      console.log("dev db establised");
    } else if (process.env.ROOM === "prod") {
      console.log("remote db established");
    } else {
      console.log("no db found");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = con;
