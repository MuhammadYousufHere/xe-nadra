const { Router } = require("express");
const User = require("../model/User");
const router = Router();
router.get("/:userID", async (req, res) => {
  const { userID } = req.params;
  console.log(userID);
  try {
    const profile = await User.findById({
      _id: userID,
    });
    if (!profile) {
      return res.status(404).json({
        msg: "Oops! No user found.",
      });
    }
    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error :(");
  }
});

module.exports = router;
