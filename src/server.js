const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const connectMongoBD = require("../config/db");
dotenv.config();

//
const app = express();
const port = process.env.PORT || 8080;
//connectMongoBD
connectMongoBD();

//
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
app.use("/api/register", require("../routes/user"));
app.use("/api/getprofile", require("../routes/profile"));
app.use("/api/verify", require("../routes/verify"));
app.use("/api/auth", require("../routes/auth"));
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
