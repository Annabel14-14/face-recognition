var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  matricNumber: String,
  firstName: String,
  lastName: String,
  college: String,
  department: String,
  isLoggedIn: Boolean,
  loggedInTime: String
});

module.exports = mongoose.model('User', UserSchema);