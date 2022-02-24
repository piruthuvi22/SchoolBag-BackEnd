const express = require("express");
const router = express.Router();
const StreamController = require("../controllers/stream");

router.get('/',StreamController.get_all_stream);

router.post('/',StreamController.create_stream);

router.get('/:id',StreamController.get_stream_by_id);


router.patch('/:id',StreamController.update_stream);

router.delete('/:id',StreamController.delete_stream);

module.exports = router;