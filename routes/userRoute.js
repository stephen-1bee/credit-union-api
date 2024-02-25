const express = require("express");
const router = express.Router();
const activitySchema = require("../model/activitiesSchema");
const usersSchema = require("../model/usersSchema");
const mongoose = require("mongoose");
const accountSchema = require("../model/accountSchema");
const bcrypt = require("bcrypt");

// create
router.post("/create", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const userExist = await usersSchema.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "user already exits" });
    }

    const newUser = new usersSchema({
      fullname,
      email,
      password,
    });

    const savedUser = await newUser.save();

    const getRandom = () => {
      const initRandom = [];
      const myRandom = Math.floor(Math.random() * 80000) + 100000;
      initRandom.push(myRandom);
      return initRandom;
    };

    let myRandom_number = getRandom();

    if (savedUser) {
      const newAccount = new accountSchema({
        account_name: fullname,
        user_id: savedUser._id,
        account_number: "acc" + myRandom_number.toString(),
      });

      const save_account = await newAccount.save();

      if (save_account) {
        res
          .status(200)
          .json({ msg: "user created successfully", savedUser, newAccount });

        const message = `${fullname} with email ${email} created a new account`;

        const newMessge = new activitySchema({
          message,
        });

        // adding new activity
        const addActivity = await newMessge.save();
      }
    } else {
      res.status(404).json({ msg: "failed to create user" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server errror" });
  }
});

//delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ msg: "user id not found" });
    }

    const delUser = await usersSchema.findByIdAndDelete(userId);

    return delUser
      ? res.status(200).json({ msg: "user deleted successfully", delUser })
      : res.status(404).json({ msg: "failed to delete user" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server errror" });
  }
});

// update
router.put("/update/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ msg: "user id not found" });
    }

    const { fullname, email, password } = req.body;

    const updateUser = await usersSchema.updateOne(
      { _id: userId },
      { fullname, email, password }
    );

    return updateUser.modifiedCount === 1
      ? res.status(200).json({ msg: "update user successfully" })
      : res.status(404).json({ msg: "failed to update user" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server errror" });
  }
});

// all user
router.get("/all", async (req, res) => {
  try {
    const allUsers = await usersSchema.find().sort({ dateCreated: -1 });

    res.status(200).json({ user_count: allUsers.length, allUsers });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

router.get("/one/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId) {
      return res.status(400).json({ msg: "failed to get user id" });
    }

    const user = await usersSchema.findOne({ _id: userId });

    return user
      ? res.status(200).json({ msg: "success", user })
      : res.status(404).json({ msg: "fialed to get user" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

module.exports = router;
