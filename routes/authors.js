'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../knex');

router.get('/', (req, res, next) => {
  knex('authors')
    .join('books_authors', 'books_authors.author_id', 'authors.id')
    .join('books', 'books.id', 'books_authors.book_id')
    .then(data => {
      // Handle the authors PUG page with all of the data here.
      let newData = manipulateData(data, 'authors');
      res.send(newData);
      // return res.render('authors', { title: 'Galvanize Authors' });
      return;
    })
    .catch(err => {
      next(err);
    });
});

router.get('/:id', (req, res, next) => {
  knex('authors')
    .where('authors.id', id)
    .join('books_authors', 'books_authors.author_id', 'authors.id')
    .join('books', 'books.id', 'books_authors.book_id')
    .then(data => {
      if (data.length !== 0) {
        // Handle the author received in the PUG file here.
        let newData = manipulateData(data, 'authors');
        res.send(newData);
        // return res.render('author', { title: 'Galvanize Reads' });
      }
      // Handle not having the book in the database.
      // return res.render('404', { title: 'Galvanize Reads' });
      return;
    })
    .catch(err => {
      next(err);
    });
});

router.get('/new', (req, res, next) => {
  res.render('newbook', { title: 'Galvanize Reads' });
});

router.post('/', (req, res, next) => {
  const { first_name, last_name, bio, portal_url } = req.body;
  const newAuthor = { first_name, last_name, bio, portal_url };

  knex('authors')
    .insert(newAuthor, ['first_name', 'last_name', 'bio', 'portal_url'])
    .then(count => {
      // After completing, send to the newly created book page.
      return;
      // return res.render('author', { title: 'Galvanize Reads' });
    })
    .catch(err => {
      next(err);
    });
});

router.patch('/:id', (req, res, next) => {
  const id = req.params.id;
  const { title, genre, description, cover_url } = req.body;

  const changedAuthor = { title, genre, description, cover_url };
  knex('authors')
    .where('authors.id', id)
    .update(changedAuthor, ['first_name', 'last_name', 'bio', 'portal_url'])
    .then(data => {
      if (data) {
        // Go back to the book page, with the newly updated information.
        // return res.render('book', { title: 'Galvanize Reads' });
      }
      // Handle not having the book in the database.
      // res.render('404', { title: 'Galvanize Reads' });
    })
    .catch(err => {
      next(err);
    });
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  knex('authors')
    .where('authors.id', id)
    .del()
    .then(data => {
      if (data) {
        // Go back to the all authors page, maybe with a modal present.
        // return res.render('author', { title: 'Galvanize Reads' });
      }
      // Handle not having the book in the database.
      // res.render('404', { title: 'Galvanize Reads' });
    })
    .catch(err => {
      next(err);
    });
});


module.exports = router;
