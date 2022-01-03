const Subject = require("../models/subject");
const { route } = require("./institute");


exports.get_all_subject =  async (req, res) => {
    try {
      const subject = await Subject.find();
      res.json(subject);
    } catch (err) {
      res.send("Error " + err);
    }
  };


exports.get_subject_by_id =  async (req, res) => {
    try {
      const subject = await Subject.findById(req.params.id);
      res.json(subject);
    } catch (err) {
      res.send("Error " + err);
    }
  };

exports.create_subject =  async (req, res) => {
    const subject = new Subject({
      subject: req.body.subject,
    });
    try {
      const a1 = await subject.save();
      res.json(a1);
    } catch (err) {
      res.send(err);
    }
  };


exports.delete_subject = async (req, res) => {
    subjectID = req.params.id;
    const data = Subject.deleteOne({ _id: subjectID }, (err) => {
      if (err) res.json(err);
      res.send("Deleted");
    });
  };