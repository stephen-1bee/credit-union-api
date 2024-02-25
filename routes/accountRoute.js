const express = require("express");
const router = express.Router();
const accountSchema = require("../model/accountSchema");
const mongoose = require("mongoose");
const usersSchema = require("../model/usersSchema");
const activitiesSchema = require("../model/activitiesSchema");

router.post("/create", async (req, res) => {
  try {
    const { user_id } = req.body;

    const random = () => {
      const myRandom = [];
      const handleRandom = Math.floor(Math.random() * 800000) + 100000;
      myRandom.push(handleRandom);

      return myRandom;
    };

    const user = await usersSchema.findOne({ _id: user_id });
    const currentUser = user.fullname;

    const message = `A new  account was created for ${currentUser} `;

    const newActivity = new activitiesSchema({
      message,
    });

    const savedActivity = await newActivity.save();

    const my_random_number = random();

    const newAccount = new accountSchema({
      account_name: currentUser,
      user_id,
      account_number: "acc" + my_random_number.toString(),
    });

    const savedAccount = await newAccount.save();

    return savedAccount
      ? res
          .status(200)
          .json({ msg: "account created successfully", savedAccount })
      : res.status(404).json({ msg: "failed to create an account" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const account = await accountSchema.find().sort({ dateCreated: -1 });

    res
      .status(200)
      .json({ msg: "success", account_count: account.length, account });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server" });
  }
});

// account by user id
router.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ msg: "account id not found" });
    }

    const account = await accountSchema.aggregate([
      {
        $match: {
          user_id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
    ]);

    return res
      .status(200)
      .json({ msg: "success", account_count: account.length, account });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const accountId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(accountId)) {
      return res.status(400).json({ msg: "account id not found" });
    }

    const delAccount = await accountSchema.findByIdAndDelete(accountId);

    return delAccount
      ? res
          .status(200)
          .json({ msg: "account deleted successfully", delAccount })
      : res.status(404).json({ msg: "failed to delete account" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server" });
  }
});
module.exports = router;
