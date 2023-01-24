const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    role:{type:String,enum:["admin","user"],default:"user",require:true}
},{
    timestamps:true
})

const User = mongoose.model("user",UserSchema)

module.exports = User