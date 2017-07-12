'use-strict';

const express = require('express');
const Auth = require('../lib/auth');
const Stats = require('../lib/stats');

const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

let api = express.Router();


api.get('/:userId', Auth.verifyToken, (req, res) => {
  if (req.decoded.id !== req.params.userId) {
    res.json({error: 'Invalid User.'});
  }

  Stats.retrieveUserStats(req.params.userId)
    .then((userRecord)=> {
      res.json({results: userRecord});
    })
    .catch((error)=> {
      res.json({error});
    });
});


api.post('/', Auth.verifyToken, jsonParser, (req, res) => {

  if (req.decoded.id !== req.body.uid) {
    res.json({error: 'Invalid User.'});
  }
  // TODO: some sort of validation would be great...
  Stats.uploadUserStats(req.body)
    .then((uploadedStat)=> {
      res.json({result: uploadedStat});
    })
    .catch((error)=> {
      res.json({error});
    });
});

module.exports = api;
