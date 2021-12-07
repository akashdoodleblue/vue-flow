const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentController");

router.post("/add", commentController.addCommnet);
router.post("/child-add", commentController.addChildCommnet);


module.exports = router;