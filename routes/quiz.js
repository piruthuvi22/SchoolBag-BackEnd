const { response } = require("express");
const express = require("express");
const fs = require("fs");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);
var ObjectId = require("mongodb").ObjectId;

const router = express.Router();
const Quiz = require("../models/quizModel");
const Institute = require("../models/instituteModel");
const upload = require("../multer-engine/engine");

router.get("/", async (req, res) => {
  try {
    const quiz = await Quiz.find();
    res.json(quiz);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    res.json(quiz);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.post("/", async (req, res) => {
  const quiz = new Quiz({
    InstituteID: req.body.InstituteID,
    SubjectId: req.body.SubjectId,
    QuizName: req.body.QuizName,
    Term: req.body.Term,
  });
  try {
    const a1 = await quiz.save();
    institute1 = Institute.findById(quiz.InstituteID);

    const d = await Institute.updateOne(
      { _id: quiz.InstituteID },
      { $push: { available: quiz.Term } }
    );
    res.status(200).json("Saved & updated");
  } catch (err) {
    res.json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndRemove(req.params.id, (err, quiz) => {
      // As always, handle any potential errors:
      if (err) return res.status(500).send(err);
      // We'll create a simple object to send back with a message and the id of the document that was removed
      // You can really do this however you want, though.
      const response = {
        message: "quiz successfully deleted",
      };
      return res.status(200).send(response);
    });
  } catch (err) {
    res.send("Error " + err);
  }
});

router.patch("/:id", upload.single("myFile"), async (req, res) => {
  req.fields ? console.log(req.fields) : console.log(req.body);

  //Getting the answers and Making it as arrays
  let answersReceived = req.body.answers;
  let answersToAdd = answersReceived.split(",,");

  if (req.file !== undefined) {
    console.log(req.file);
    const path = req.file.path;
    //Create the Question object
    let newQuestion = {
      Question: req.body.question,
      Answers: answersToAdd,
      CorrectAnswer: req.body.correctAnswer,
      Path: path,
    };

    try {
      const i = Quiz.updateOne(
        { _id: req.params.id }, // wrap in ObjectID },
        { $push: { Questions: newQuestion } },
        (done) => {
          res.status(200).json("saved with file");
        }
      );
    } catch (err) {
      console.log(err);
    }
  } else {
    //Create the Question object
    let newQuestion = {
      Question: req.body.question,
      Answers: answersToAdd,
      CorrectAnswer: req.body.correctAnswer,
    };

    try {
      const i = Quiz.updateOne(
        { _id: req.params.id }, // wrap in ObjectID },
        { $push: { Questions: newQuestion } },
        (done) => {
          res.status(200).json("saved without file");
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
});

// Route for Delete the quiz-images
router.post("/delete-img/", async (req, res) => {
  // path like > "uploads\\img-1617997789932.jpg"
  let path = req.body.path;
  await unlinkAsync("uploads\\" + req.body.path);
  res.send(path);
});

// Route for hit like
router.post("/hit/:id", async (req, res) => {
  let _id = req.params.id;
  const hit = await Quiz.findById({ _id }).select({
    _id: 0,
    InstituteID: 0,
    SubjectId: 0,
    QuizName: 0,
    Term: 0,
    Questions: 0,
    __v: 0,
  });
  let hitCount = hit.Hit + 1;

  Quiz.updateOne({ _id }, { Hit: hitCount }, (err, docs) => {
    if (err) {
      res.json(err);
    } else {
      res.json(docs);
    }
  });
});

module.exports = router;
