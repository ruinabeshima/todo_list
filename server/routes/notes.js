const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authController.js");

router.get("/dashboard", authenticateToken, (req, res) => {
  res.json({message: "You are logged in!!!!!!", user: req.user})
});

module.exports = router