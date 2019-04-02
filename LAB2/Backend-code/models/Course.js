const mongoose = require("mongoose");
const User = require("../models/User");
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  courseName: { type: String },
  courseDept: { type: String },
  courseTerm: { type: String },
  courseDescription: { type: String },
  courseRoom: { type: String },
  courseCapacity: { type: Number },
  waitlistCapacity: { type: Number },
  lectureTime: { type: String },

  permissionNumber: [{ type: Number }],
  assignments: [
    {
      assignmentName: { type: String },
      assignmentDetail: { type: String },
      assignmentType: { type: String },
      points: { type: Number },
      dueDate: { type: Date }
    }
  ],
  Quiz: [
    {
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
  ],
  Announcements: [
    {
      annuoncementTitle: { Type: String },
      announcementDetails: { Type: String },
      announcementDate: { Type: Date }
    }
  ]
});

module.exports = mongoose.model("Course", CourseSchema);
