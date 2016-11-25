'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Board = new Schema({
  name: { type: String, required: true },
  description: String
});

module.exports = mongoose.model('Board', Board);
