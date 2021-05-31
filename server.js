// Dependencies 
const express = require('express');
const path = require('path');
const PORT = 8080;
const app = express();
const fs = require('fs');
let db = require('./db/db.json'); // importing literal db from path

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
app.get('/api/notes', (req, res)=>res.json(db)

    // res.sendFile(path.join(__dirname,'db/db.json'))
)



// function writeNotes(notes){

// }

app.post('/api/notes',(req, res)=>{
    
    let note = req.body;
    console.log("this is the note inside POST", typeof note)    

    db.push(note); // this is updating the database array object

    console.log(db)

    // JSON.stringify(db) -> where db is the buffer we're writing from
    // db being the filename we are writing to
    fs.writeFile(db, JSON.stringify(db), (err) => { // updates db file
        if(err) return console.error(err);
        res.json(note); // this responds to the index.js
    }) 
    

    // read from file all notes to creat array
    
    // const notes = await getAllNotes(); 
    
    // console.log(notes);
    
    // push the newly created note unto the array
    
    // notes.push(note); 

    // write to file the entire array to update
    // await writeNotes(notes);  
    // respond to frontend with the newly created note
    // res.json(note); 

    // console.log(note);
    // read the json file to extract content
    


})

// function getAllNotes(){
//     fs.readFile('./db/db.json', 'utf8', (err, data)=>{
//         if (err) return console.error(err)
//         console.log("this is the data inside getAllNotes", data)
//         return data;
//     })
// }

app.delete('/api/notes', ()=>{

})

// Direct user to homepage if no path matches
app.get('*', (req, res) => res.sendFile(path.join(__dirname,'public/index.html')));

// write to the JSON when the save button is pressed
// identify the note user wants to delete via id
// remove from the file

app.listen(PORT, ()=> console.log(`App is listening on PORT ${PORT}`));