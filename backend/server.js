const express = require('express');
const mongoose = require('mongoose');

// Create Express app
const app = require("./app");

// Parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
const mongoURI = 'mongodb://127.0.0.1:27017/recipe'; 
mongoose.connect(mongoURI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
const port = 4000; 
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
