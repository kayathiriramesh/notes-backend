const express = require("express");
const router = express.Router();
const Note = require("../Models/NoteModels");

router.get("/notes", async (req, res) => {
    try {
        const notes = await Note.find();
        res.send(notes);
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post("/addnote", async (req, res) => {
    try {
        const newnote = new Note(req.body);
        await newnote.save();
        res.send("Note added successfully");
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post("/editnote", async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.body._id });
        note.title = req.body.title;
        note.content= req.body.content;
        await note.save();

        res.send("Note details updated successfully");
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post("/deletenote", async (req, res) => {
    try {
        await Note.findOneAndDelete({ _id: req.body.id });

        res.send("Note deleted successfully");
    } catch (error) {
        return res.status(400).json(error);
    }
});

module.exports = router;