const db = require("../db/queries.js");

async function addNote(req, res) {
  try {
    const { title, description, priority } = req.body;
    const user = req.user;

    // Missing inputs
    if (!title || !description || priority === undefined || priority === null) {
      return res.status(400).json({ message: "Missing inputs" });
    }

    const response = await db.insertTodo(user.id, title, description, priority);

    return res
      .status(201)
      .json({ message: "Todo created successfully", response });
  } catch (error) {
    return res.status(400).json({ message: "Internal server error" });
  }
}

module.exports = { addNote };
