const mongoose = require('../module/mongoose');

var schema = new mongoose.Schema({
    title: {type:String} ,
    content: {type:String},
    date: {type:String},
    complete: {type:String},
}, {collection: "Todo"});


var model1 = mongoose.model("model1", schema)
module.exports = model1;


