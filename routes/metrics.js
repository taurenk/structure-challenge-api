'use-strict';

const express = require('express');
const Metrics = require('../lib/metrics');
const Auth = require('../lib/auth');
let api = express.Router();

api.get('/leaderboard', Auth.verifyToken, async(req, res)=> {
  try {
    let leaderboard = await Metrics.getLeaderboard();
    res.json({results: leaderboard});
  } catch(error) {
    console.log(error);
    res.json({error});
  }
});

module.exports = api;
