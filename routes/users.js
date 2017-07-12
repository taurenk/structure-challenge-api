'use-strict';

const express = require('express');
const Users = require('../lib/users');
const Auth = require('../lib/auth');
let api = express.Router();

const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

api.get('/:userId', Auth.verifyToken, (req, res) => {
  Users.retrieveUserById(req.params.userId)
    .then((userRecord)=> {
      res.json({result: userRecord});
    })
    .catch((error)=> {
      res.json({error});
    });
});

api.post('/', jsonParser, (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let password = req.body.password;
  // TODO: some sort of validation would be great...
  Users.createUser(email, name, password)
    .then((userRecord)=> {
      res.json({result: 'ok'});
    })
    .catch((error)=> {
      res.json({error});
    });
});


module.exports = api;
