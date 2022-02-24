const express = require("express");
const router = express.Router();
const InstituteController = require("../controllers/institute");
const MulterUploader = require("../../multer-engine/engine");


router.get("/",InstituteController.get_all_institute);

router.get("/:id",InstituteController.get_institute_by_id);

router.post("/",MulterUploader.single("logo"),InstituteController.create_institute);

router.patch("/:id",MulterUploader.single("logo"),InstituteController.update_institute);

module.exports = router;
