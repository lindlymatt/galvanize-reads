'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('authors', (table) => {
    table.increments().primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('bio').notNullable();
    table.string('portal_url').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('authors');
};
