const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create Express app
const app = require("./app");

// Parse JSON request bodies
app.use(express.json());

// Enable CORS for all routes
// app.use(cors());
app.use(cors({
  origin: 'hhttps://recipe-search-sigma.vercel.app',
}));

// Connect to MongoDB
mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log(`Connected to MongoDB ${process.env.DB_URI}`);
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Add this middleware before your routes to handle CORS headers
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, world to All!');
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});


/////////////////////////////////////////////////////////////////
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require("cors");

// // Create Express app
// const app = require("./app");

// // Parse JSON request bodies
// // https://recipe-search-five.vercel.app
// app.use(express.json());
// // app.use(
// //   cors({
// //     origin: '*',
// //     methods: ['POST', 'GET'],
// //     credentials: true,
// //   })
// // );

// app.use(cors()); 

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'POST, GET');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   // res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });


// // Connect to MongoDB
// mongoose.connect(process.env.DB_URI);
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log(`Connected to MongoDB ${process.env.DB_URI}`);
// });

// // Define a simple route
// app.get('/', (req, res) => {
//   res.send('Hello, world to All!');
// });

// // Start the server

// app.listen(process.env.PORT,() => {
//   console.log(`Server started on port ${process.env.PORT}`);
// });
