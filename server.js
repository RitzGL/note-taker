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
app.get('/api/notes', (req, res)=>res.json(db));

app.post('/api/notes',(req, res)=>{
    
    let note = req.body; 

    db.push(note); // this is updating the database array object

    // JSON.stringify(db) -> where db is the buffer we're writing from
    // db being the filename we are writing to
    fs.writeFile('./db/db.js', JSON.stringify(db), (err) => { // updates db file
        if(err) return console.error(err);
        res.json(note); // this responds to the index.js
        console.log("Note added to JSON file");
    }) 
})

// this will eventually handle deleting notes
app.delete('/api/notes', ()=>{

})

// Direct user to homepage if no path matches
app.get('*', (req, res) => res.sendFile(path.join(__dirname,'public/index.html')));

app.listen(PORT, ()=> console.log(`App is listening on PORT ${PORT}`));