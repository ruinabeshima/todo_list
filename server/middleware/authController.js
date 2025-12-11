const db = require("../db/queries.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function registerUser(req, res) {
  try {
    const { username, password, password2 } = req.body;

    // No inputs
    if (!username || !password || !password2) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Username already exists
    const user = await db.getUser(username);
    if (user) {
      return res.status(409).json({ error: "Username already exists" });
    }

    // Passwords do not match
    if (password !== password2) {
      return res.status(409).json({ error: "Passwords do not match" });
    }

    // Password should be at least 8 characters
    if (password.length < 8) {
      return res.status(400).json({ error: "Password is too short" });
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
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    // Check if account exists
    const user = await db.getUser(username);
    if (!user) {
      return res.status(404).json({ error: "User account does not exist" });
    }

    // Compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Password does not match" });
    }

    // Create JSON Web Token
    const options = { expiresIn: "1h" };
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET_KEY,
      options
    );

    // Send cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
    });

    return res.status(200).json({
      message: "User logged in",
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Middlware to authenticate the JWT token
function authenticateToken(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      // 401 error for a mismatching token
      return res.status(401).json({ error: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
    });

    // 401 Error for an invalid token
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = { registerUser, loginUser, authenticateToken };
