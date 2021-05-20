// Dependencies 
const express = require('express');
const path = require('path');
const PORT = 8080;
const app = express();

// Using the path of the 'public' directory
// app.use(express.static('public'));

// Direct user to the main page
app.get('/', (req, res) => res.sendFile(path.join(__dirname,'public/index.html')));

// Direct user to the notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname,'public/notes.html')));

// Direct user to homepage if no path matches
app.get('*', (req, res) => res.sendFile(path.join(__dirname,'public/index.html')));

app.listen(PORT, ()=> console.log(`App is listening on PORT ${PORT}`));