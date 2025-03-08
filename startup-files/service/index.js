const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express()

//data scruture for users and scores, deleted after each restart, DB will take care of persistent data
let users = [];
let scores = [];

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

//allows backend to read JSON
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

//differenciating between endpoint calls and frontend calls
let apiRouter = express.Router();
app.use(`/api`, apiRouter);


//tells code where to listen 
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});