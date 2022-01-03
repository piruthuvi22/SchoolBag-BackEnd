const fs = require("fs");
const { promisify } = require("util");
const configApi = require("../../config.json");
const unlinkAsync = promisify(fs.unlink);
const ExamPaper = require("../models/examPaper");
const Institute = require("../models/institute");
//const Object = require("mongoose").ObjectId;
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);


exports.get_all_quiz =  async (req, res) => {
    try {
      const examPaper = await ExamPaper.find();
      if (examPaper.length > 0) {
        res.json(examPaper);
      } else {
        console.log("No quiz found");
        res.json([false]);
      }
    } catch (err) {
      res.send("Error " + err);
    }
  };

  exports.get_quiz_list = async (req, res) => {
    let obj,
      data = [];
    try {
      const quiz = await ExamPaper.find().select({ Questions: 0 });
      if (quiz.length > 0) {
        try {
          for (let n = 0; n < quiz.length; n++) {
            const instituteName = await Institute.findById(
              quiz[n].InstituteID
            ).select({ name: 1, _id: 0 });
            obj = Object.assign({}, quiz[n].toObject());
            obj["instituteName"] = instituteName["name"];
            data.push(obj);
          }
          // console.log(data);
          res.json(data);
        } catch (err) {
          res.send("Error " + err);
        }
      } else {
        console.log("No quiz found");
        res.json([false]);
      }
    } catch (err) {
      res.send("Error " + err);
    }
  };

  exports.get_quiz_by_id = async (req, res) => {
    let obj;
    try {
      const quiz = await ExamPaper.findById(req.params.id);
      try {
        const instituteName = await Institute.findById(quiz.InstituteID).select({
          name: 1,
          _id: 0,
        });
        obj = Object.assign({}, quiz.toObject());
        obj["instituteName"] = instituteName["name"];
        console.log(obj);
        res.json(obj);
      } catch (err) {
        res.send("Error " + err);
      }
    } catch (err) {
      res.send("Error " + err);
    }
  };

  exports.create_quiz =  async (req, res) => {
    const quiz = new ExamPaper({
      InstituteID: req.body.InstituteID,
      SubjectName: req.body.SubjectName,
      ExamPaperName: req.body.ExamPaperName,
      Grade:req.body.Grade
    });
    try {
      const a1 = await quiz.save();
      institute1 = Institute.findById(quiz.InstituteID);
      res.status(200).json("Saved");
    } catch (err) {
      console.log("ERROR" + err);
      res.json(err);
    }
  };


  exports.delete_quiz =  async (req, res) => {
    try {
      const quiz = await ExamPaper.findByIdAndRemove(req.params.id, (err, quiz) => {
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
  };

  exports.create_questions =  async (req, res) => {
    //Getting the answers and Making it as arrays
    let answersReceived = req.body.answers;
    let answersToAdd = answersReceived.split(",,");
  
    if (req.file !== undefined) {
      let imgInfo =await cloudinary.uploader
      .upload(req.file.path, {
          use_filename: true,
          folder: "school-bag/examPaper/image",
          public_id: req.file.filename,
      });
      //Create the Question object
      let newQuestion = {
        Question: req.body.question,
        Answers: answersToAdd,
        CorrectAnswer: req.body.correctAnswer,
        Path: imgInfo,
      };
  
      try {
        const i = ExamPaper.updateOne(
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
        const i =await ExamPaper.updateOne(
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
  };


  exports.delete_quiz_image =  async (req, res) => {

      let qno = req.params.qno;
      let examPaper = await ExamPaper.findById(req.params.id);
      await cloudinary.uploader.destroy(examPaper.Questions[qno].Path.public_id);
      console.log(examPaper);
      res.send("image deleted");
  };


  exports.add_hit =  async (req, res) => {
    let _id = req.params.id;
    const hit = await ExamPaper.findById({ _id }).select({
      _id: 0,
      InstituteID: 0,
      SubjectId: 0,
      QuizName: 0,
      Term: 0,
      Questions: 0,
      __v: 0,
    });
    let hitCount = hit.Hit + 1;
  
    ExamPaper.updateOne({ _id }, { Hit: hitCount }, (err, docs) => {
      if (err) {
        res.json(err);
      } else {
        res.json(docs);
      }
    });
  };

  exports.edit_question = async(req,res)=>{
    let existExampaper = await ExamPaper.findById(req.params.id);
    let answersReceived = req.body.answers;
   
    
    let id = req.params.id;
    let qno = req.params.qno;
    console.log(qno);
    let examPaper = await ExamPaper.findOne({_id:id});
    let qid = examPaper.Questions[req.params.qno]._id;
    
    if (req.file !== undefined) {
      console.log(existExampaper.Questions[qno].Path.public_id);
      await cloudinary.uploader.destroy(existExampaper.Questions[qno].Path.public_id);
      let imgInfo =await cloudinary.uploader
      .upload(req.file.path, {
          use_filename: true,
          folder: "school-bag/examPaper/image",
          public_id: req.file.filename,
      });
      //Create the Question object
      let newQuestion = {
        Question: req.body.question,
        CorrectAnswer: req.body.correctAnswer,
        Path: imgInfo,
      }
      if(answersReceived != null){
        let answersToAdd = answersReceived.split(",,");
        newQuestion.Answers = answersToAdd;
      }else{
        newQuestion.Answers = examPaper.Questions[qno].Answers;
      }

       
      try {
        examPaper.Questions[qno] = newQuestion;
        await examPaper.save();
        res.send("updated successfull...").status(200);
      } catch (err) {
        console.log(err);
      }
  }else{

    let newQuestion = {
      Question: req.body.question,
      CorrectAnswer: req.body.correctAnswer,
      path:examPaper.Questions[qno].path,
    };
    if(answersReceived != null){
      let answersToAdd = answersReceived.split(",,");
      newQuestion.Answers = answersToAdd;
    }else{
      newQuestion.Answers = examPaper.Questions[qno].Answers;
    }

    try {
      examPaper.Questions[qno] = newQuestion;
     await examPaper.save();
      res.send("updated successfully...").status(200);
    } catch (err) {
      console.log(err);
    }
  }

}