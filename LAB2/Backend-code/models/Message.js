const mongoose = require("mongoose");
const User = require("../models/User");
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  senderId: String,
  receiverId: String,
  message: JSON,
  messageId: String
});
