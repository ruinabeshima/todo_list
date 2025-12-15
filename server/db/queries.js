const pool = require("./dbconfig.js");

async function getUser(username) {
  const user = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return user.rows[0];
}

async function insertUser(username, password) {
  const result = await pool.query(
    "INSERT INTO users (username, password) VALUES($1, $2) RETURNING id, username",
    [username, password]
  );
  return result.rows[0];
}

async function insertTodo(user_id, title, description, priority) {
  const result = await pool.query(
    "INSERT INTO todo (user_id, title, description, priority) VALUES($1, $2, $3, $4) RETURNING todo_id, user_id, date_created",
    [user_id, title, description, priority]
  );
  return result.rows[0];
}

async function getIncompleteTodos(user_id) {
  const result = await pool.query(
    "SELECT todo_id, user_id, title, description, priority, is_completed, date_created FROM todo WHERE user_id = $1 AND is_completed = false ORDER BY priority DESC, date_created DESC",
    [user_id]
  );
  return result.rows;
}

async function getCompleteTodos(user_id) {
  const result = await pool.query(
    "SELECT todo_id, user_id, title, description, priority, is_completed, date_created FROM todo WHERE user_id = $1 AND is_completed = true ORDER BY priority DESC, date_created DESC",
    [user_id]
  );
  return result.rows;
}


module.exports = { insertUser, getUser, insertTodo, getIncompleteTodos, getCompleteTodos };
