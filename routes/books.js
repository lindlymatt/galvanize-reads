'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../knex');

router.get('/', (req, res, next) => {
  knex('books')
    .fullOuterJoin('books_authors', 'books_authors.book_id', 'books.id')
    .fullOuterJoin('authors', 'authors.id', 'books_authors.author_id')
    .then(data => {
      // Handle the books PUG page with all of the data here.
      let newData = manipulateData(data, 'books');
      res.send(newData);
      // res.render('books', { booksObj: getFinalBooksObj(data) });
    })
    .catch(err => {
      next(err);
    });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  knex('books')
    .join('books_authors', 'books_authors.book_id', 'books.id')
    .join('authors', 'authors.id', 'books_authors.author_id')
    .where('books.id', id)
    .then(data => {
      if (data.length !== 0) {
        // Handle the book received in the PUG file here.
        let newData = manipulateData(data, 'books');
        // res.render('book', { title: 'Galvanize Reads' });
        res.send(newData);
      }
      // Handle not having the book in the database.
      // res.render('404', { title: 'Galvanize Reads' });
      res.status(404).send('Not Found');
    })
    .catch(err => {
      next(err);
    });
});

router.get('/new', (req, res, next) => {
  res.render('new-book', { title: 'Galvanize Reads' });
});

router.post('/', (req, res, next) => {
  const { title, genre, description, cover_url } = req.body;
  const newBook = { title, genre, description, cover_url };

  knex('books')
    .insert(newBook, ['title', 'genre', 'description', 'cover_url'])
    .then(result => {
      // After completing, send to the newly created book page.
      // res.render('book', { title: 'Galvanize Reads' });
      res.send(result);
    })
    .catch(err => {
      next(err);
    });
});

router.patch('/:id', (req, res, next) => {
  const id = req.params.id;
  const { title, genre, description, cover_url } = req.body;

  const changedBook = { title, genre, description, cover_url };
  knex('books')
    .where('books.id', books)
    .update(changedBook, ['title', 'genre', 'description', 'cover_url'])
    .then(data => {
      // Go back to the book page, with the newly updated information.
      // res.render('book', { title: 'Galvanize Reads' });
      res.send(data);
    })
    .catch(err => {
      next(err);
    });
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  knex('books')
    .where('books.id', id)
    .del()
    .then(result => {
      // Go back to the all books page, maybe with a modal present.
      // res.render('book', { title: 'Galvanize Reads' });
      return;
    })
    .catch(err => {
      next(err);
    });
});

// Handle the Data, getting it back in an acceptable manner.
function manipulateData(obj, type) {
  let finalObj = {};

  // Use this part of the function for the Books.
  if (type === 'books') {
    for (let i = 0; i < obj.length; i++) {
      // Create a new object structure.
      if (finalObj.hasOwnProperty('b' + obj[i].book_id)) {
        finalObj['b' + obj[i].book_id].authors.push(`${obj[i].first_name} ${obj[i].last_name}`);
      } else {
        finalObj['b' + obj[i].book_id] = {
          title: obj[i].title,
          genre: obj[i].genre,
          description: obj[i].description,
          cover_url: obj[i].cover_url,
          authors: [obj[i].first_name + ' ' + obj[i].last_name]
        }
      }
    }
  }
  // Use this part if you're handling Authors.
  else {
    for (let i = 0; i < obj.length; i++) {
      // Create a new object structure.
      if (finalObj.hasOwnProperty('a' + obj[i].author_id)) {
        finalObj['a' + obj[i].author_id].books.push(`${obj[i].title}`);
      } else {
        finalObj['a' + obj[i].author_id] = {
          first_name: obj[i].first_name,
          last_name: obj[i].last_name,
          bio: obj[i].bio,
          portal_url: obj[i].portal_url,
          books: [obj[i].title]
        }
      }
    }
  }

  return finalObj;
}

module.exports = router;
