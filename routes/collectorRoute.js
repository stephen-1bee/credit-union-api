const express = require("express");
const router = express.Router();
const collectorSchema = require("../model/collectorSchema");
const activity = require("../model/activitiesSchema");
const activitiesSchema = require("../model/activitiesSchema");


router.post("/create", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const userExist = await collectorSchema.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "collector already exits" });
    }

    const message = `Collector ${fullname} with email ${email} created a new account`;

    const newActivity = new activitiesSchema({
      message,
    });

    const savedActivity = await newActivity.save();

    const newCollector = new collectorSchema({
      fullname,
      email,
      password,
    });

    const savedCollector = await newCollector.save();

    return savedCollector
      ? res.status(200).json({
          msg: "collector created successfully",
          savedUser: savedCollector,
        })
      : res.status(404).json({ msg: "failed to create collector" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server errror" });
  }
});

// all collectors
router.get("/all", async (req, res) => {
  try {
    const allUsers = await collectorSchema.find();

    res.status(200).json({ user_count: allUsers.length, allUsers });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

//delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const collectorId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(collectorId)) {
      return res.status(400).json({ msg: "collector id not found" });
    }

    const delCollector = await collectorSchema.findByIdAndDelete(collectorId);

    return delCollector
      ? res.status(200).json({
          msg: "collector deleted successfully",
          delUser: delCollector,
        })
      : res.status(404).json({ msg: "failed to delete collector" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server errror" });
  }
});

// update
router.put("/update/:id", async (req, res) => {
  try {
    const collectorId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(collectorId)) {
      return res.status(400).json({ msg: "collector id not found" });
    }

    const { fullname, email, password } = req.body;

    const updateCollector = await collectorSchema.updateOne(
      { _id: collectorId },
      { fullname, email, password }
    );

    return updateCollector.modifiedCount === 1
      ? res.status(200).json({ msg: "updated collector successfully" })
      : res.status(404).json({ msg: "failed to update collector" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server errror" });
  }
});

module.exports = router;
