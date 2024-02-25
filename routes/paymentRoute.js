const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const paymentSchema = require("../model/paymentSchema");
const activitiesSchema = require("../model/paymentSchema");
const usersSchema = require("../model/usersSchema");

router.post("/create", async (req, res) => {
  try {
    const { user_id, amount } = req.body;

    const user = await usersSchema.findOne({ _id: user_id });

    const currentUser = user.fullname;

    const message = `An amount of ${amount} has been made by ${currentUser}`;

    const newActivity = new activitiesSchema({
      message,
    });

    const savedActivity = await newActivity.save();

    const newPayment = new paymentSchema({
      user_id,
      amount,
    });

    const savedPayment = await newPayment.save();

    return savedPayment
      ? res.status(200).json({
          msg: "payment sent successfully",
          saved_payment: savedPayment,
        })
      : res.status(404).json({ msg: "fialed to send payment" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

// all payments by user
router.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ msg: "user id not found" });
    }

    const userPayment = await paymentSchema.find({ user_id: userId });

    return userPayment
      ? res.status(200).json({ msg: "success", user_payment: userPayment })
      : res.status(404).json({ msg: "failed to get user payment" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const paymentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(paymentId)) {
      return res.status(400).json({ msg: "payment id not found" });
    }

    const delPayment = await paymentSchema.findByIdAndDelete(paymentId);

    return delPayment
      ? res
          .status(200)
          .json({ msg: "payment deleted successfully", delRequest: delPayment })
      : res.status(404).json({ msg: "failed to delete payment" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server errror" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const allPayments = await paymentSchema.find();

    res.status(200).json({ payment_count: allPayments.length, allPayments });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});
module.exports = router;
