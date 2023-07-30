const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

// Create Express app
const app = require("./app");

// Parse JSON request bodies
// https://recipe-search-five.vercel.app
app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: ['POST', 'GET'],
    credentials: true,
  })
);

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'https://recipe-search-five.vercel.app');
//   res.header('Access-Control-Allow-Methods', 'POST, GET');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });


// Connect to MongoDB
mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log(`Connected to MongoDB ${process.env.DB_URI}`);
});

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, world to All!');
});

// Start the server

app.listen(process.env.PORT,() => {
  console.log(`Server started on port ${process.env.PORT}`);
});
