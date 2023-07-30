const express = require('express');
const mongoose = require('mongoose');

// Create Express app
const app = require("./app");

// Parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log(`Connected to MongoDB ${process.env.DB_URI}`);
});

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server

app.listen(process.env.PORT,() => {
  console.log(`Server started on port ${process.env.PORT}`);
});
