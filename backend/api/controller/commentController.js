const fs = require("fs");

var commentModel = require("../model/Comment");
var screenModel = require("../model/Screen");

exports.addCommnet = async (req, res) => {
  try {
    console.log(req.body);
    const comment = new commentModel(req.body);
    // save comment
    await comment.save();
    const screenRelated = await screenModel.findById(req.body.screen);
    screenRelated.comments.push(comment);
    await screenRelated.save();
    const screen = await screenModel
      .findById(req.body.screen)
      .populate("createdBy", "_id name avatar")
      .populate({
        path: "comments",
        options: { sort: { createdAt: -1 } },
        populate: { path: "user", model: "User", select: "_id name avatar" },
      });
    res.json({ data: screen });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
};


exports.addChildCommnet = async (req, res) => {
    try {
      console.log(req.body);
      const commentRelated = await commentModel.findById(req.body.parentComment);
      commentRelated.child.push({name : req.body.user, msg : req.body.text});
      await commentRelated.save();
      const screen = await screenModel
        .findById(req.body.screen)
        .populate("createdBy", "_id name avatar")
        .populate({
          path: "comments",
          options: { sort: { createdAt: -1 } },
          populate: { path: "user", model: "User", select: "_id name avatar" },
        });
      res.json({ data: screen });
    } catch (err) {
      console.log(err);
      res.status(400).json({ err: err });
    }
  };
  