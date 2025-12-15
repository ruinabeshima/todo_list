const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authController.js");
const {
  addNote,
  showIncompleteNotes,
  showCompleteNotes,
  updateTodoCompletion,
} = require("../middleware/notesController.js");

router.get("/dashboard-incomplete", authenticateToken, showIncompleteNotes);
router.get("/dashboard-complete", authenticateToken, showCompleteNotes);

router.patch("/update-completion", authenticateToken, updateTodoCompletion);

router.get("/add", authenticateToken, (req, res) => {
  return res.json({ message: "User logged in" });
});

router.post("/add", authenticateToken, addNote);

module.exports = router;
