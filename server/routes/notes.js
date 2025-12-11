const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authController.js");
const { addNote } = require("../middleware/notesController.js");

router.get("/dashboard", authenticateToken, (req, res) => {
  return res.json({ message: "User logged in", user: req.user });
});

router.get("/add", authenticateToken, (req, res) => {
  return res.json({ message: "User logged in" });
});

router.post("/add", authenticateToken, addNote);

module.exports = router;
