'use strict';

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('books_authors').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('books_authors').insert({
          id: 1,
          book_id: 1,
          author_id: 1
        }),
        knex('books_authors').insert({
          id: 2,
          book_id: 2,
          author_id: 2
        }),
        knex('books_authors').insert({
          id: 3,
          book_id: 3,
          author_id: 3
        }),
        knex('books_authors').insert({
          id: 4,
          book_id: 4,
          author_id: 4
        }),
        knex('books_authors').insert({
          id: 5,
          book_id: 5,
          author_id: 4
        }),
        knex('books_authors').insert({
          id: 6,
          book_id: 6,
          author_id: 4
        }),
        knex('books_authors').insert({
          id: 7,
          book_id: 1,
          author_id: 5
        }),
        knex('books_authors').insert({
          id: 8,
          book_id: 1,
          author_id: 6
        }),
      ]);
    })
    .then(() => knex.raw("SELECT setval('books_authors_id_seq', (SELECT MAX(id) FROM books_authors))"));
};
