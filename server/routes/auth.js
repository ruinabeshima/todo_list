const express = require("express");
const router = express.Router();
const { RegisterUser } = require("../middleware/authController.js");

router.post("/register", RegisterUser);

module.exports = router;
