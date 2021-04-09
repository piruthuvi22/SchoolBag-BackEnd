const express = require("express");
const router = express.Router();
const Subject = require("../models/subjectModel");
const { route } = require("./institute");

router.get("/", async (req, res) => {
  try {
    const subject = await Subject.find();
    res.json(subject);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    res.json(subject);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.post("/", async (req, res) => {
  const subject = new Subject({
    subject: req.body.subject,
  });
  try {
    const a1 = await subject.save();
    res.json(a1);
  } catch (err) {
    res.send(err);
  }
});

router.delete("/:id", async (req, res) => {
  subjectID = req.params.id;
  const data = Subject.deleteOne({ _id: subjectID }, (err) => {
    if (err) res.json(err);
    res.send("Deleted");
  });
});

module.exports = router;
