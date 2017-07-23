
const Promise = require('bluebird');
const mongo = require('../lib/mongo');
let Auth = require('../lib/auth');
let ObjectId = require('mongodb').ObjectId;

class Users {

  async retrieveUserById(userId) {
    let foundUser = await mongo.getCollection('users').findOneAsync({'_id': ObjectId(userId)});
    if (foundUser === null) {
      let err =  new Error('User Not Found');
      err.name = 'UserNotFound';
      err.statusCode = 404;
      throw err;
    }
    delete foundUser.password;
    return foundUser;
  }


  async createUser(email, name, password) {
    let foundUser = await mongo.getCollection('users').findOneAsync({'email': email});
    if (foundUser) {
      let err =  new Error('Account with that email all ready exists.');
      err.name = 'AccountExists';
      err.statusCode = 500;
      throw err;
    }
    let newUserRecord = {
      email: email,
      name: name,
      password: Auth.encrypt(password)
    };
    let userRecord = await mongo.getCollection('users').insertOneAsync(newUserRecord);
    delete userRecord.password;
    return userRecord;
  }
}

module.exports = new Users();
