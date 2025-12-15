const db = require("../db/queries.js");

async function addNote(req, res) {
  try {
    const { title, description, priority } = req.body;
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const priorityNumber = Number(priority);

    // Missing inputs
    if (!title || !description || priority === undefined || priority === null) {
      return res.status(400).json({ message: "Missing inputs" });
    }

    if (!Number.isInteger(priorityNumber)) {
      return res.status(400).json({ message: "Priority must be an integer" });
    }

    const response = await db.insertTodo(
      user.userId,
      title,
      description,
      priorityNumber
    );

    return res
      .status(201)
      .json({ message: "Todo created successfully", response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function showIncompleteNotes(req, res) {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const todos = await db.getIncompleteTodos(user.userId);
    return res
      .status(200)
      .json({ message: "Todos successfully obtained", todos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


async function showCompleteNotes(req, res) {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const todos = await db.getCompleteTodos(user.userId);
    return res
      .status(200)
      .json({ message: "Todos successfully obtained", todos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { addNote, showIncompleteNotes, showCompleteNotes };
