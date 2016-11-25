'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const List = require('../models/list');
const Card = require('../models/card');

router.get('/', (req, res) => {
  let query = List.find({});
  query.where('boardId', req.query.boardId);
  query.exec( (err, lists ) => {
    res.json(lists);
  });
});

router.post('/', (req, res) => {
  let { name, boardId } = req.body;
  new List({
    name,
    boardId
  }).save( (err, list) => {
    res.json(list);
  });
})

router.put('/:id', (req, res) => {
  List.findByIdAndUpdate(
    req.params.id,
    { $set: { name: req.body.name }},
    { new: true },
    (err, list) => {
      res.json(list)
  });
});

router.delete('/:id', (req, res) => {
  List.findById(req.params.id, (err, list) => {
    list.remove();
    Card.find({'listId': req.params.id}).remove().exec( (err, cards) => {
      res.status(200).send({ success: true });
    });
  });
});

module.exports = router;
