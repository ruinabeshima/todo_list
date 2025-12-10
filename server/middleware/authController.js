const db = require("../db/queries.js");
const bcrypt = require("bcrypt");

async function registerUser(req, res) {
  try {
    const { username, password, password2 } = req.body;

    // No inputs
    if (!username || !password || !password2) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Username already exists
    const user = await db.getUser(username);
    if (user) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // Passwords do not match
    if (password !== password2) {
      return res.status(409).json({ message: "Passwords do not match" });
    }

    // Password should be at least 8 characters
    if (password.length < 8) {
      return res.status(400).json({ message: "Password is too short" });
    }

    // Hash password and add to database
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await db.insertUser(username, hashPassword);
    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: result.id,
        username: result.username,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    // Check if account exists
    const user = await db.getUser(username);
    if (!user) {
      return res.status(404).json({ message: "User account does not exist" });
    }

    // Compare passwords
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({ message: "Password does not match" });
    }

    return res.status(201).json({ message: "User logged in" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { registerUser, loginUser };
