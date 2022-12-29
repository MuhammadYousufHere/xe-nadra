const { Router } = require("express");
const User = require("../model/User");
const router = Router();
router.get("/:userID", async (req, res) => {
  const { userID } = req.params;
  try {
    const profile = await User.findById({
      _id: userID,
    });
    if (!profile) {
      return res.status(404).json({
        msg: "Oops! No user found.",
        msgStatus: 404,
      });
    }
    res.json({ id: profile._id, email: profile.email });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message, msgStatus: 500 });
  }
});

module.exports = router;
