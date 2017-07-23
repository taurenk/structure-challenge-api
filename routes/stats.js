'use-strict';

const express = require('express');
const Auth = require('../lib/auth');
const Stats = require('../lib/stats');

const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

let api = express.Router();

errorHandler = (err, res) => {
  console.error(err.stack);
  if (err.statusCode) { res.status(err.statusCode); };
  return res.json({error: err});
}


api.get('/:userId', Auth.verifyToken, async (req, res) => {
  if (req.decoded.id !== req.params.userId) {
    res.json({error: 'Invalid User.'});
  }

  try {
    let results = await Stats.retrieveUserStats(req.params.userId);
    res.json({results});
  } catch (error) {
    errorHandler(error);
  }

});


api.post('/', Auth.verifyToken, jsonParser, async (req, res) => {

  if (req.decoded.id !== req.body.uid) {
    res.json({error: 'Invalid User.'});
  }
 
  try {
    // TODO: some sort of validation would be great...
    let result = await Stats.uploadUserStats(req.body);
    res.json({result});
  } catch (error) {
    errorHandler(error);
  }

});

module.exports = api;
