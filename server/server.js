const express = require("express");
const app = express();
const authRouter = require("./routes/auth.js")

require('dotenv').config()
app.use(express.json());
app.use("/auth", authRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`)
});
