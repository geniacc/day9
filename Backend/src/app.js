const express = require("express")
const noteModel = require("./models/node.model")
const cors = require("cors")


const app = express()
app.use(express.json())
app.use(cors())

//-post /api/notes
// -create new note and save data in mongodb 
//req.body = {title, description}

app.post("/api/notes",async (req, res) =>{
    const {title, description} = req.body

    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message:"note created successfully",//201 status code because we created a new resource 
        note
    })
    
})

//GET /api/notes
// Fetch all the notes data form the mongodb and send them in the response 
app.get("/api/notes",async (req, res) =>{
   const notes =  await noteModel.find()

   res.status(200).json({
    message:"notes fetched successfully",
    notes
   })
})

/**
 * - DELETE /api/notes/:id
 * - Delete note with the id from req.params
 */
app.delete('/api/notes/:id', async (req, res) => {
    const id = req.params.id

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "Note deleted successfully."
    })
})

/**
 * - PATCH /api/notes/:id
 * - update the description of the note by id
 * - req.body = {description}
 */
app.patch('/api/notes/:id', async (req, res) => {
    const id = req.params.id
    const { description } = req.body

    await noteModel.findByIdAndUpdate(id, { description })

    res.status(200).json({
        message: "Note updated successfully."
    })

})


module.exports = app 