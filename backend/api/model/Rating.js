
var mongoose = require('mongoose');
 
var ratingSchema = new mongoose.Schema({
    design: {type :Number , default : 0},
    easy: {type :Number , default : 0},
    visual: {type :Number , default : 0},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    screen:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Screen'
    }
});
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('Rating', ratingSchema);