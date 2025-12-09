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

module.exports = { getUser, insertUser };
