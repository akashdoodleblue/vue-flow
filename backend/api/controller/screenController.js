const fs = require("fs");
const { userInfo } = require("os");

var screenModel = require("../model/Screen");
var userModel = require("../model/User");

exports.addScreen = async (req, res) => {
  try {
    var img = fs.readFileSync(req.file.path);
    //console.log("IMAGEEE, 10",img)
    var encode_img = img.toString("base64");
    //console.log("ENCODEDE IIMAG", encode_img)
    var final_img = {
      contentType: req.file.mimetype,
      data: Buffer.from(encode_img, "base64"),
    };

    var body = { ...req.body, img: final_img };
    screenModel.create(body, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        //console.log(result);
        console.log("Saved To database");
        res.contentType(final_img.contentType);
        res.send(final_img.image);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
};

exports.getScreen = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const category = req.query.category ? req.query.category : "Mobile";
    const sortBy = req.query.sortBy
      ? req.query.sortBy == "New"
        ? { _id: -1 }
        : { totalRating: -1 }
      : { _id: -1 };
    const skip = (page - 1) * limit;
    const screens = await screenModel
      .find({ category })
      .populate("createdBy", "_id name avatar")
      .sort(sortBy)
      .skip(skip)
      .limit(limit);
    const total = await screenModel.countDocuments({ category });
    res.json({ data: screens, total: total });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
};

exports.getScreenById = async (req, res) => {
  try {
    const userRelated = await userModel.findById(req.user._id).populate({
      path: 'rating.ratingId',
      match: { screenId: req.params.id },
      options: { limit: 1 }
    })
    .exec();
    console.log("USERRRRRR",userRelated)
    const _id = req.params.id;
    const screen = await screenModel
      .findOne({ _id })
      .populate("createdBy", "_id name avatar")
      .populate({
        path: "comments",
        options: { sort: { createdAt: -1 } },
        populate: { path: "user", model: "User", select: "_id name avatar" },
      });

    if (!screen) {
      return res.status(404).send();
    }

    res.send(screen);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
