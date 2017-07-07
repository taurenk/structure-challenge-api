'use-strict';

const express = require('express');
const Users = require('../lib/users');
const Auth = require('../lib/auth');
let api = express.Router();

api.get('/:userId', Auth.verifyToken, (req, res) => {
  Users.retrieveUserById(req.params.userId)
    .then((userRecord)=> {
      res.json({result: userRecord});
    })
    .catch((error)=> {
      res.json({error});
    });
});

api.post('/', (req, res) => {
  
});

module.exports = api;
