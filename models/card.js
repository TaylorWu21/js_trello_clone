'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Card = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  listId: { type: String, required: true }
});

module.exports = mongoose.model('Card', Card);

