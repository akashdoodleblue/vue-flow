const express = require("express");
const router = express.Router();
const screenController = require("../controller/screenController");
const multer = require("multer");
const path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() +'.jpg')
    }
  })
 
var upload = multer({ storage: storage })

router.post("/add", upload.single('myImage'), screenController.addScreen);
router.get("/get", screenController.getScreen);
router.get("/get/:id", screenController.getScreenById);

module.exports = router;