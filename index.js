const connectToMongo = require("./db");
const path = require("path");
const dotenv=require('dotenv');
dotenv.config();
const express = require("express");
connectToMongo();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello Sadi!");
});
// Available Routes:
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
