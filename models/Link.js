'use strict'
var mongoose = require("mongoose");
var Schema = mongoose.Schema;



// Link Schema
var LinkSchema = new Schema
({
    id: String, //auto incrementing number
    url: String,
    stamp: {type: Date, default: Date.now},
});



// set the id before saving
LinkSchema.pre('save', async function(next)
{
    let link = this;
    let newId = (await Link.find({})).length;
    link.id = newId;
    return next();
});



// Expose the model to the server
var Link = mongoose.model("Link", LinkSchema);
module.exports = Link;