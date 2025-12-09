const db = require("../db/queries.js");

async function RegisterUser(req, res) {
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

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { RegisterUser };
