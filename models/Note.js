//importing the package 
const mongoose = require('mongoose');
//import schema to make the schema
const {Schema}= mongoose;
const NotesSchema = new Schema({
  user:{
type:mongoose.Schema.Types.ObjectId,
ref:'user'
  } , 
    title: {
     type:String,
    required: true
 },
 description:{
    type:String,
    required: true
 },
 tag:{
     type:String,
    default:"General"
 },
 date:{
     type: Date,
     default: Date.now
 }
 });
 //exporting the module 
 module.exports = mongoose.model('notes',NotesSchema);