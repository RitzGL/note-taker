// Dependencies 
const express = require('express');
const path = require('path');
const PORT = 8080;
const app = express();
const fs = require('fs');

// Using the path of the 'public' directory
app.use(express.static('./public'));

// registering the express.json middleware
app.use(express.json());

// Direct user to the main page

// /c/Bootcamp/note-taker/public/index.html
app.get('/', (req, res) => res.sendFile(path.join(__dirname,'public/index.html')));

// Direct user to the notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname,'public/notes.html')));

// send the JSON file for the page to render
app.get('/api/notes', (req, res)=>{
    res.sendFile(path.join(__dirname,'db/db.json'))
})

app.post('/api/notes', async (req, res)=>{
    const note = req.body;
    
    note.id = null; // set id onto note element
    const notes = await getAllNotes(); // read from file all notes to creat array
    notes.push(note); // push the newly created note unto the array
    await writeNotes(notes); // write to file the entire array to update 
    res.json(note); // respond to frontend with the newly created note

    console.log(note);
    // read the json file to extract content
    fs.readFile('./db/db.json','utf8',(err, data)=>{
        if(err){
            console.error(err);
            return;
        }
        // console.log(data);
        // let objectsFromJSON = JSON.parse(data);
        // console.log(objectsFromJSON);
        
        // fs.writeFile('./db/db.json',)
    })


})

app.delete('/api/notes', ()=>{

})

// Direct user to homepage if no path matches
app.get('*', (req, res) => res.sendFile(path.join(__dirname,'public/index.html')));

// write to the JSON when the save button is pressed
// identify the note user wants to delete via id
// remove from the file

app.listen(PORT, ()=> console.log(`App is listening on PORT ${PORT}`));