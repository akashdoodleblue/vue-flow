const fs = require("fs");

var screenModel = require('../model/Screen');



exports.addScreen = async (req, res) => {
    try {
        console.log("FILEEEEEEEE PATHHHHHHHHHH", req.body)
        var img = fs.readFileSync(req.file.path);
        //console.log("IMAGEEE, 10",img)
    var encode_img = img.toString('base64');
    //console.log("ENCODEDE IIMAG", encode_img)
    var final_img = {
        contentType:req.file.mimetype,
        data:Buffer.from(encode_img, 'base64'),
    };

   var body = {...req.body,img : final_img}
   screenModel.create(body,function(err,result){
        if(err){
            console.log(err);
        }else{
            //console.log(result);
            console.log("Saved To database");
            res.contentType(final_img.contentType);
            res.send(final_img.image);
        }
    })
       } catch (err) {
           console.log(err)
         res.status(400).json({ err: err });
       }
};

exports.getScreen = async (req, res) => {
    try {
            const screens = await screenModel.find().populate('createdBy', '_id name avatar')

            res.send(screens)
       } catch (err) {
           console.log(err)
         res.status(400).json({ err: err });
       }
};

exports.getScreenById = async (req, res) => {
    try{
        const _id = req.params.id
        const screen = await screenModel.findOne({ _id}).populate('createdBy', '_id name avatar')

        if (!screen) {
            return res.status(404).send()
        }

        res.send(screen)
    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }
}