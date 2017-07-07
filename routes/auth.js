'use-strict';

const express = require('express');
const Auth = require('../lib/auth');
let api = express.Router();

const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();


api.post('/login', jsonParser, (req, res) => {
  let email = req.body.email;
  let password = Auth.encrypt(req.body.password);
  Auth.login(email, password)
    .then((token)=> {
      res.json({token});
    })
    .catch((error)=> {
      res.json({error});
    });
});

module.exports = api;
