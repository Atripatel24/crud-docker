const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    birthdate:String,
    gender:String,
    subject:Array
})

const Users = mongoose.model('check',schema)

module.exports = Users