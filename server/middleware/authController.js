async function RegisterUser(req, res) {
  try {
    const { username, password, password2 } = req.body;

    // No inputs
    if (!username || !password || !password2) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Passwords do not match
    if (password !== password2) {
      return res.status(409).json({ message: "Passwords do not match" });
    }

    // Password should be at least 8 characters
    if (password.length < 8) {
      return res.status(400).json({ message: "Password is too short" });
    }

    // Username already exists
    // SQL Query
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { RegisterUser };
