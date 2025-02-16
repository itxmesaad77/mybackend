const express = require('express');
const { body, validationResult } = require('express-validator');
const fetchuser=require('../middleware/fetchUser');
const Note = require('../models/Note');
const router= express.Router();
// route 1: Get all the notes: Get "/api/notes/fetchallnotes".  login required
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
   const notes= await Note.find({user:req.user.id}); 
   res.json(notes);
}) 
// route 2: Add a new note: Post "/api/notes/addnote".  login required
router.post('/addnote',fetchuser,[
    body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('description', 'Description must be atleast 5 character').isLength({ min: 5 })
],async (req,res)=>{
    try {
        const {title,description,tag}=req.body;
    const errors= validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
       const note = new Note({
        title,description,tag,user:req.user.id
      });
    
    const saveNote = await  note.save();
    res.json(saveNote);
    
    } catch (error) {
        console.error(error.message);
    res.status(500).send("Internal Server Error");
    }
 }) 
 // route 3: update a  note: put "/api/notes/updatenote".  login required
 router.put('/updatenote/:id',fetchuser,async (req,res)=>{
try {
    const {title,description,tag}=req.body;
    // create a newNote object
    const newNote={}

    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}

    
    //find the note to be updated and update it
    let note =await Note.findById(req.params.id);
    if(!note){
        res.status(404).send("Not found");
    }
    if(note.user.toString()!==req.user.id){
        res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.json({note});
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})

 // route 4: Delete  a  note: delete "/api/notes/deletenote".  login required
 router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    try {
        //find the note to be deleted and delete it
        let note =await Note.findById(req.params.id);
        if(!note){
            res.status(404).send("Not found");
        }
        if(note.user.toString()!==req.user.id){
            res.status(401).send("Not Allowed");
        }
         await Note.findByIdAndDelete(req.params.id);
        res.json({"Success":"Note has been deleted",note:note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    })
module.exports = router