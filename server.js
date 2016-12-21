'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const authors = require('./routes/authors');
const books = require('./routes/books');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extendend:false
}));

app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(authors);
// app.use(books);

app.get('/', (req, res, next) => {
  res.send("HELLO WORLD");
  console.log("HELLO WORLD");
});

app.listen(port, () => {
  console.log('Listening on port: ', port);
});

module.exports = app;
