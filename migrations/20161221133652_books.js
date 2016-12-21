'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', (table) => {
    table.increments().primary();
    table.string('title').notNullable();
    table.string('genre').notNullable();
    table.string('description').notNullable();
    table.string('cover_url').notNullable();
    table.timestamps(true,true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};
