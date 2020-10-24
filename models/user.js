// models > pen.js den getirdik
const mongoose = require('mongoose');
const user = new mongoose.Schema({
    _id : mongoose.ObjectId,
    name : String,
    productNumber : {
        type : Number,
        required : false, // true dersekmutlaka ürünün productNumber ının olması gerektiği
        unique : false // true başka hiç bir productNumber aynı olmamalı
    },
})

module.exports = mongoose.model("user", user);

