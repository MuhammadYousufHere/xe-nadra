const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const connectMongoBD = require("../config/db");
dotenv.config();
// const multer = require("multer");

// const DIR = '../images';
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, DIR);
//   },
//   filename: (req, file, cb) => {
//     const fileName = path
//       .extname(file.originalname)
//       .toLowerCase()
//       .split(' ')
//       .join('-');
//     cb(null, Date.now() + '-' + fileName);
//   },
// });
// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype == 'image/png' ||
//       file.mimetype == 'image/jpg' ||
//       file.mimetype == 'image/jpeg'
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//     }
//   },
// });

//

const app = express();
const port = process.env.PORT || 8080;
//connectMongoBD
connectMongoBD();

//
app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({ useTempFiles: true }));
// Serve static files from the React app
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "../client/build/index.html"));
  });
}

//
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

app.use("/api/captcha", require("../routes/varifyCaptcha"));
app.use("/api/resetpassword", require("../routes/resetPassword"));
app.use("/api/forgotpassword", require("../routes/forgotPassword"));
app.use("/api/resendcode", require("../routes/resendCode"));
app.use("/api/register", require("../routes/registerUser"));
app.use("/api/getprofile", require("../routes/profile"));
app.use("/api/verify", require("../routes/verify"));
app.use("/api/auth", require("../routes/auth"));
app.use("/api/appointment", require("../routes/appointment"));
app.use("/api/verifyappointment", require("../routes/verifyAppointment"));
app.use("/api/verifyface", require("../routes/verifyFace"));
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
