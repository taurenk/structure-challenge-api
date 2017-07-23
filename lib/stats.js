
const mongo = require('../lib/mongo');

class Stats {

  async retrieveUserStats(userId) {
    return await mongo.getCollection('stats').find({'uid': userId}).toArray();
  }

  async uploadUserStats(stat) {
    return await mongo.getCollection('stats').insertOneAsync(stat);
  }
}

module.exports = new Stats();
