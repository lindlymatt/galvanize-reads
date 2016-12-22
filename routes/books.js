'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../knex');

router.get('/', (req, res, next) => {
  knex('books')
    .join('books_authors', 'books_authors.book_id', 'books.id')
    .join('authors', 'authors.id', 'books_authors.author_id')
    .then(data => {
      delete data.created_at;
      delete data.updated_at;
      // Handle the books PUG page with all of the data here.
      const newData = getFinalBooksObj(data);
      res.send(newData);
      // res.render('books', { booksObj: getFinalBooksObj(data) });
    })
    .catch(err => {
      next(err);
    });
});

router.get('/:id', (req, res, next) => {
  knex('books')
    .where('books.id', id)
    .first()
    .then(data => {
      if (data) {
        // Handle the book received in the PUG file here.
        // res.render('book', { title: 'Galvanize Reads' });
        return;
      }
      // Handle not having the book in the database.
      // res.render('404', { title: 'Galvanize Reads' });
      return;
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
    .then(count => {
      // After completing, send to the newly created book page.
      // res.render('book', { title: 'Galvanize Reads' });
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
      return;
      // Go back to the all books page, maybe with a modal present.
      // res.render('book', { title: 'Galvanize Reads' });
    })
    .catch(err => {
      next(err);
    });
});

function getFinalBooksObj(objArr) {
  let finalObj = {};
  for (let i = 0; i < objArr.length; i++) {
    // Create a new object structure.
    if (finalObj.hasOwnProperty(objArr[i].book_id)) {
      finalObj[objArr[i].book_id].authors.push(`${objArr[i].first_name} ${objArr[i].last_name}`);
    } else {
      finalObj[objArr[i].book_id] = {
        title: objArr[i].title,
        genre: objArr[i].genre,
        description: objArr[i].description,
        cover_url: objArr[i].cover_url,
        authors: [objArr[i].first_name + ' ' + objArr[i].last_name]
      }
    }
  }

  return finalObj;
}

module.exports = router;
