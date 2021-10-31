const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("src"));
app.use(express.static("src/img"));
app.use(express.static("src/stats"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/index.html");
});

app.get("/performance", (req, res) => {
  res.sendFile(__dirname + "/src/stats/stats.html");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
