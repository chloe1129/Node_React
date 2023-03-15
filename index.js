const express = require("express");
const app = express(); // new express app
const port = 3000; // my backend server port

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://chloe:a1234@atlascluster.vwk8mbf.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useCreateIndex: true,
      //useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB connected!!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World! 나는 이채현");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
