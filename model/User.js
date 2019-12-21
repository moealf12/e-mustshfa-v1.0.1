const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userShema = new Schema({
first_name : {
    required:true,
    type:String
},
last_name : {
    required:true,
    type:String
},
email: {
    required:true,
    type:String
},
password : {
    required:true,
    type:String
},
dob : {
    required:true,
    type:Date
},
weight : {
    required:true,
    type:Number
},
height : {
    required:true,
    type:Number
},
nationality : {
    required:true,
    type:String
},
phoneNumber : {
    required:true,
    type:String
},
emergencyName : {
    required:true,
    type:String
},
specialty: {
    required:true,
    type:String
},
year_of_exp : {
    required:true,
    type:String
},
gender : {
    required:true,
    type:String
},
working_time : {
    required:true,
    type:String
},
rating : {
    required:true,
    type:String
},
emergencyPhone : {
    required:true,
    type:String
},
},{timestamps:true})
 
const User = mongoose.model('user',userShema)
module.exports=User