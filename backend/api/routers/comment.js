const fs = require("fs");

var commentModel = require('../model/Comment');



exports.addComment = async (req, res) => {
    try {
   var body = req.body
   commentModel.create(body,function(err,result){
        if(err){
            console.log(err);
        }else{
            //console.log(result);
            console.log("Saved To database");
            
        }
    })
       } catch (err) {
           console.log(err)
         res.status(400).json({ err: err });
       }
};

