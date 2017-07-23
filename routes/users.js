'use-strict';

const express = require('express');
const Users = require('../lib/users');
const Auth = require('../lib/auth');
let api = express.Router();

const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

errorHandler = (err, res) => {
  if (err.statusCode) { res.status(err.statusCode); };
  if (err.name) { res.name = err.name; };
  return res.json({error: err});
}


api.get('/:userId', Auth.verifyToken, async (req, res) => {
  try {
    let user = await Users.retrieveUserById(req.params.userId);
    res.json({result: user});
  } catch (error) {
    errorHandler(error);
  }
});

api.post('/', jsonParser, async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let password = req.body.password;
  // TODO: some sort of validation would be great...
  try {
    let userRecord = await Users.createUser(email, name, password);
    res.json({result: userRecord});
  } catch (error) {
    errorHandler(error);
  }
});


module.exports = api;
