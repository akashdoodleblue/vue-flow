const fs = require("fs");

var ratingModel = require("../model/Rating");
var screenModel = require("../model/Screen");
var userModel = require("../model/User");

exports.addRating = async (req, res) => {
  try {
    console.log(req.body);
    const rating = new ratingModel(req.body);
    // save comment
    await rating.save();
    const screenRelated = await screenModel.findById(req.body.screen);
    screenRelated.rating.design = Math.floor((screenRelated.rating.design + rating.design)/Math.floor(((screenRelated.outOfRating + 15)/15)))
    screenRelated.rating.easy = Math.floor((screenRelated.rating.easy + rating.easy)/Math.floor(((screenRelated.outOfRating + 15)/15)))
    screenRelated.rating.visual = Math.floor((screenRelated.rating.visual + rating.visual)/Math.floor(((screenRelated.outOfRating + 15)/15)))
    screenRelated.outOfRating = screenRelated.outOfRating + 15
    screenRelated.numOfRating++
    screenRelated.totalRating = (Math.ceil(screenRelated.rating.design + screenRelated.rating.easy +  screenRelated.rating.visual) / 3).toFixed(1);
    await screenRelated.save();
console.log("RAAAAAAAAAATING", rating)
    const userRelated = await userModel.findById(req.body.user);
    userRelated.rating.push({ratingId : rating, screenId : screenRelated._id})
    await userRelated.save()
    const screen = await screenModel
      .findById(req.body.screen)
      .populate("createdBy", "_id name avatar")
      .populate({
        path: "comments",
        options: { sort: { createdAt: -1 } },
        populate: { path: "user", model: "User", select: "_id name avatar" },
      });
      screen.userRating = rating
    res.json({ data: {...screen._doc, userRating : rating} });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
};

  