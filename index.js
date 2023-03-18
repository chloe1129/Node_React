const express = require("express");
const app = express(); // new express app
const port = 3000; // my backend server port

const bodyParser = require("body-parser");
const { User } = require("./models/User");

// application/x-www-form-urlencoded
// get and parse data form above
app.use(bodyParser.urlencoded({ extended: true }));

// application/json
// get and parse data form above
app.use(bodyParser.json());

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
  res.send("Hello World! 나는 이채현, 탐정이죠");
});

app.post("/register", async (req, res) => {
  // get info about sign up from client
  // put the data to database

  // get value in `body` by body parser
  const user = new User(req.body);

  // mongoDB method, save to user model
  const result = await user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
