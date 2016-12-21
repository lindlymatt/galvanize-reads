'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('authors', table => {
    table.increments();
    table.text('first_name').notNullable().defaultTo('');
    table.text('last_name').notNullable().defaultTo('');
    table.text('bio').notNullable().defaultTo('');
    table.text('portal_url').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('authors');
};
