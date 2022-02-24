const express = require("express");
const router = express.Router();
const SubjectController = require("../controllers/subject");

router.get("/",SubjectController.get_all_subject);

router.get("/:id",SubjectController.get_subject_by_id);

router.post("/",SubjectController.create_subject);

router.delete("/:id", SubjectController.delete_subject);

module.exports = router;
