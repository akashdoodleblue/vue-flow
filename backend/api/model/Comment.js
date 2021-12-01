
var mongoose = require('mongoose');
 
var commentSchema = new mongoose.Schema({
    text: String,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    screen:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Screen'
    },
    child : {type : Array , default : []} 
},{
    timestamps: true
});
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('Comment', commentSchema);