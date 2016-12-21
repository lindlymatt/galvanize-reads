"use strict";

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('books_authors').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('books_authors').insert({
          book_id: 1,
          author_id: 1
        }),
        knex('books_authors').insert({
          book_id: 2,
          author_id: 2
        }),
        knex('books_authors').insert({
          book_id: 3,
          author_id: 3
        }),
        knex('books_authors').insert({
          book_id: 4,
          author_id: 4
        }),
        knex('books_authors').insert({
          book_id: 5,
          author_id: 4
        }),
        knex('books_authors').insert({
          book_id: 6,
          author_id: 4
        }),
        knex('books_authors').insert({
          book_id: 1,
          author_id: 5
        }),
        knex('books_authors').insert({
          book_id: 1,
          author_id: 6
        })
      ]);
    });
};
