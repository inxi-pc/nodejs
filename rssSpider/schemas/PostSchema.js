var mongoose = require('mongoose');
var PostSchema = new mongoose.Schema({
    title:{type:String,unique:true},
    description :String,
    imgs:String,
    context:String,
    link :String,
    pubDate :{
        type:Date,
        'default':Date.now
    },
});

module.exports = PostSchema;