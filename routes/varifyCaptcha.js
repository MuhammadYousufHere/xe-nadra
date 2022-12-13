const { Router } = require("express");
const axios = require("axios");
const router = Router();
const secret = process.env.REACT_APP_CAPTCHA_SECRET_KEY;

router.post("/", async function (req, res) {
  const { token } = req.body;
  try {
    const response = await await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
    );
    if (response.data.success) {
      res.status(200).json({ success: true });
      return;
    } else {
      res.status(400).json({ success: false });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});
module.exports = router;
