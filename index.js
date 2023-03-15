const express = require("express");
const app = express(); // new express app
const port = 3000; // my backend server port

app.get("/", (req, res) => {
  res.send("Hello World! 나는 이채현");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
