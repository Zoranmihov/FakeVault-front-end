const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "dist/front-end")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist/front-end", "index.html"));
});

app.listen(process.env.PORT || 5000);
