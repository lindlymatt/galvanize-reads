"use strict";

const express = require('express');
const router = express.Router();
const knex = require('../knex');


router.get('/authors', (req, res, next) => {
  knex('authors')
    .orderBy('id')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/authors/:id', (req, res, next) => {
  knex('authors')
    .where('id', req.params.id)
    .then((result) => {
      res.send(result[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/authors', (req, res, next) => {
  var newEntry = req.body;
  // check to ensure that data is not missing from newEntry

  knex('authors')
    .insert(newEntry, '*')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
