// Dependencies 
const express = require('express');
const path = require('path');
const PORT = 8080;
const app = express();
const fs = require('fs');

// Using the path of the 'public' directory
app.use(express.static('./public'));

// Direct user to the main page

// /c/Bootcamp/note-taker/public/index.html
app.get('/', (req, res) => res.sendFile(path.join(__dirname,'public/index.html')));

// Direct user to the notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname,'public/notes.html')));

// send the JSON file for the page to render
app.get('/api/notes', (req, res)=>{
    res.sendFile(path.join(__dirname,'db/db.json'))
})


// Direct user to homepage if no path matches
app.get('*', (req, res) => res.sendFile(path.join(__dirname,'public/index.html')));


app.post('/api/notes',()=>{

})

app.delete('/api/notes', ()=>{

})


// write to the JSON when the save button is pressed


// identify the note user wants to delete via id
// remove from the file


app.listen(PORT, ()=> console.log(`App is listening on PORT ${PORT}`));