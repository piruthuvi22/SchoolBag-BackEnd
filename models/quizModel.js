const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  InstituteID: {
    type: String,
    required: true,
  },
  SubjectId: {
    type: String,
    required: true,
  },
  QuizName: {
    type: String,
    required: true,
  },
  Term: {
    type: String,
  },
  Hit: {
    type: Number,
    default: 0,
  },
  Questions: [
    {
      Question: {
        type: String,
      },
      Answers: [
        {
          type: String,
        },
      ],
      CorrectAnswer: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model("quiz", quizSchema);
