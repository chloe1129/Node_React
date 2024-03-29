const express = require("express");
const app = express(); // new express app
const port = 3000; // my backend server port

const bodyParser = require("body-parser");

const config = require("./config/key");

const { User } = require("./models/User");

// application/x-www-form-urlencoded
// get and parse data form above
app.use(bodyParser.urlencoded({ extended: true }));

// application/json
// get and parse data form above
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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

app.post("/login", (req, res) => {
  // find the requested email from database
  User.findOne({ email: req.body.email }, (err, user) => {
    // if there is no user matching this email
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "No account matching",
      });
    }

    // if email is same, check if the password word is also correct
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong Password" });

      // if the pw is correct, then generate the token
      user.generateToken((err, user) => {});
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
