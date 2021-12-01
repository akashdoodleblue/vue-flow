
var mongoose = require('mongoose');
 
var screenSchema = new mongoose.Schema({
    name: String,
    description: String,
    img:
    {
        data: Buffer,
        contentType: String
    },
    category : String,
    totalRating : {type :String, default : 0},
    rating : {
        design : {type : Number, default : 0},
        easy : {type : Number, default : 0},
        visual : {type : Number, default : 0}
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    } 
},{
    timestamps: true
});
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('Screen', screenSchema);