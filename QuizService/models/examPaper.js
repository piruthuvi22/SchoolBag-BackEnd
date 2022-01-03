const mongoose = require("mongoose");

const examPaperSchema = new mongoose.Schema({
  InstituteID: {
    type: String,
    required: true,
  },
  SubjectName: {
    type: String,
    required: true,
  },
  ExamPaperName: {
    type: String,
    required: true,
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
      Path: { type: Object },
    },
  ],
  Grade:
    {
        type:Number,
        required:true
    }

});

module.exports = mongoose.model("examPaper", examPaperSchema);
