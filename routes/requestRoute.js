const express = require("express");
const router = express.Router();
const requestSchema = require("../model/requestSchema");
const usersSchema = require("../model/usersSchema");
const activitiesSchema = require("../model/activitiesSchema");
const mongoose = require("mongoose");

router.post("/create", async (req, res) => {
  try {
    const { user_id, messages } = req.body;

    const user = await usersSchema.findOne({ _id: user_id });

    const currentUser = user.fullname;

    const message = `A request from ${currentUser} was made`;

    const newActivity = new activitiesSchema({
      message,
    });

    const savedActivity = await newActivity.save();

    const newRequest = new requestSchema({
      user_id,
      messages,
    });

    const savedRequest = await newRequest.save();

    return savedRequest
      ? res.status(200).json({ msg: "request sent successfully", savedRequest })
      : res.status(404).json({ msg: "fialed to send request" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const allRequest = await requestSchema.find();
    res.status(200).json({ count: allRequest.length, allRequest });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

// requests by user
router.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ msg: "request id not found" });
    }

    const userRequest = await requestSchema.aggregate([
      {
        $match: {
          _id: userId,
        },
      },
    ]);

    res.status(200).json({ userRequest });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const requestId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({ msg: "request id not found" });
    }

    const delRequest = await requestSchema.findByIdAndDelete(requestId);

    return delRequest
      ? res
          .status(200)
          .json({ msg: "request deleted successfully", delRequest })
      : res.status(404).json({ msg: "failed to delete request" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server errror" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const requestId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({ msg: "request id not found" });
    }
    const { messages } = req.body;

    const updateRequest = await requestSchema.updateOne(
      { _id: requestId },
      { messages }
    );

    return updateRequest.modifiedCount === 1
      ? res.status(200).json({
          msg: "request deleted successfully",
          delRequest: updateRequest,
        })
      : res.status(404).json({ msg: "failed to delete request" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server errror" });
  }
});

module.exports = router;
