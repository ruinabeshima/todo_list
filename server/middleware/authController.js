async function RegisterUser(req, res) {
  const { username, password, password2 } = req.body;
  res.json({ username, password, password2 })
}

module.exports = { RegisterUser };
