const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require("./routes/auth.js");
const notesRouter = require("./routes/notes.js");
const cookieParser = require("cookie-parser");

require("dotenv").config();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/notes", notesRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
