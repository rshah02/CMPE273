const mongoose = require("mongoose");
const User = require("../models/User");
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  courseName: { type: String, required: true },
  courseDept: { type: String, required: true },
  courseTerm: { type: String, required: true },
  courseDescription: { type: String },
  courseRoom: { type: String },
  courseCapacity: { type: Number },
  waitlistCapacity: { type: Number },
  lectureTime: { type: String },
  users: [{ user: { type: Schema.Types.ObjectId, ref: "users" } }],
  permissionNumber: { type: [Number] },
  announcements: [
    {
      announcementId: mongoose.Types.ObjectId,
      announcementTitle: { type: String },
      announcementDetails: { type: String },
      announcementDate: { type: Date }
    }
  ],
  assignments: [
    {
      assignmentId: mongoose.Types.ObjectId,
      assignmentName: { type: String },
      assignmentDetail: { type: String },
      file: { type: String },
      assignmentType: { type: String },
      points: { type: Number },
      dueDate: { type: Date },
      createDate: { type: Date }
    }
  ],
  files: [{ type: String }],
  Quiz: [
    {
      assignmentId: { type: Schema.Types.ObjectId, ref: "assignments" },
      quizName: { type: String },
      question: [
        {
          question: { type: String },
          option1: { type: String },
          option2: { Type: String },
          option3: { Type: String },
          option4: { Type: String },
          correctAnswer: { Type: String }
        }
      ],
      points: { type: String },
      dueDate: { type: Date }
    }
  ]
});

module.exports = mongoose.model("Course", CourseSchema);
/*Announcements: [
  {
    annuoncementTitle: { Type: String },
    announcementDetails: { Type: String },
    announcementDate: { Type: Date }
  }
] */
