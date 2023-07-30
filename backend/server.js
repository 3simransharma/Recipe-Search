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


// const allowedOrigins = ['http://localhost:3000'];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Check if the request origin is allowed or is undefined (for non-browser requests)
//       if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     methods: ['POST', 'GET'],
//     credentials: true,
//   })
// );

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
