'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../knex');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Galvanize Reads' });
});

module.exports = router;
