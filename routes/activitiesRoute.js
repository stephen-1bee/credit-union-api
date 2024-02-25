const express = require("express");
const router = express.Router();
const activitySchema = require("../model/activitiesSchema");

router.get("/all", async (req, res) => {
  try {
    const allActivities = await activitySchema.find().sort({ dateCreated: -1 });

    res.status(200).json({
      msg: "success",
      activity_count: allActivities.length,
      allActivities,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});
module.exports = router;
