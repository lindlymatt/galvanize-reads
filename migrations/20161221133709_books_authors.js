'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books_authors', (table) => {
    table.increments().primary();
    table.string('book_id').notNullable().references('id').inTable('books');
    table.string('author_id').notNullable().reference('id').inTable('authors');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books_authors');
};
