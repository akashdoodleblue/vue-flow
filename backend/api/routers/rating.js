const express = require("express");
const router = express.Router();
const ratingController = require("../controller/ratingController");

router.post("/add", ratingController.addRating);


module.exports = router;