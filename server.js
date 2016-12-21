'use strict';

const express = require('express');
const app = express();

// Use the body parser module to allow xml responses.
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// Allow usage of the .env variables.
require('dotenv').config();

// Get the public folder for styles and javascript.
app.use(express.static('public'));

// Set the view engine to PUG.
app.set('view engine', 'pug')

// Create variables for routes handling.
const index = require('routes/index');
const books = require('routes/books');
const authors = require('routes/authors');

// Application level middleware to send correct requests to places.
app.get('/index', index);
app.use('/books', books);
app.use('/authors', authors);

// Error handling, application-level middleware.
app.use((err, _req, res, _next) => {
  console.log(err);
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  if (err.status) {
    console.log(err);
    return res.status(err.status).send(err);
  }

  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(8000, () => {
  console.log('Currently listening for requests on Port 8000...')
});

module.exports = app;
