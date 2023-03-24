const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// length of the salt
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // remove whitespace from input
    unique: 1,
  },
  password: {
    type: String,
    maxlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// before saving user info
userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    // encrypt the password
    // genSalt: generate new salt, using saltRound
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        // Store hash in your password DB.
        if (err) return next(err);
        user.password = hash;
        // change pure pw to hash

        next();
      });
    });
  } else {
    // not changing the password
    next();
  }
});

userSchema.methods.comparePassword = function (plaiinPassword, cb) {
  // compare plain password with encrypted password in database
  bcrypt.compare(plaiinPassword, this.password, function (err, isMatch) {
    if (err) return cb(err), cb(null, isMatch);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User }; // able to use User model in other file
