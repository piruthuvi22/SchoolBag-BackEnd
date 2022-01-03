const { response } = require("express");
const express = require("express");
const router = express.Router();
const upload = require("../../multer-engine/engine");
const ExamPaperController = require("../controllers/examPaper");

router.get("/",ExamPaperController.get_all_quiz);

router.get("/list",ExamPaperController.get_quiz_list);

router.get("/:id",ExamPaperController.get_quiz_by_id);

router.post("/",ExamPaperController.create_quiz);

router.delete("/:id",ExamPaperController.delete_quiz);

router.patch("/:id", upload.single("questionImg"),ExamPaperController.create_questions);

// Route for Delete the quiz-images
router.delete("/:id/:qno",ExamPaperController.delete_quiz_image);

// Route for hit like
router.post("/hit/:id",ExamPaperController.add_hit);

router.patch("/question/:id/:qno", upload.single("questionImg"),ExamPaperController.edit_question);

module.exports = router;
