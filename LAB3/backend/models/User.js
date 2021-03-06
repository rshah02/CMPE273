const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  phone: {
    type: Number
  },
  city: {
    type: String
  },
  country: {
    type: String
  },
  school: {
    type: String
  },
  about: {
    type: String
  },
  company: {
    type: String
  },
  gender: {
    type: String
  },
  languages: {
    type: String
  },
  type: {
    type: String,
    required: true
  },
  homeTown: {
    type: String
  }
});

module.exports = mongoose.model("User", UserSchema);
