
const mongo = require('../lib/mongo');

class Metrics {

  async getLeaderboard() {
    let leaderboard = {
      'sandbagCarry': {},
      'sandbagPress': {},
      'sandbagSquat': {},
    };

    let stats = await mongo.getCollection('stats').find({}).toArray();
    let currEvent, currUid, currScore = null;
    stats.forEach((stat)=> {
      currEvent = stat.event;
      currUid = stat.uid;
      currScore = stat.reps;

      if (currEvent === 'sandbagCarry') { 
        currScore = this.calculateCarryScore(stat.length, stat.reps);
      } 
 
      if (currUid in leaderboard[currEvent]) {
         leaderboard[currEvent][currUid] += currScore;
      } else {
        leaderboard[currEvent][currUid] = currScore;
      }      
    });

    let users = await mongo.getCollection('users').find({}).toArray();
    let sortedLeaderboard = {};
    return leaderboard;
  }


  
  /**
   * @name calculateCarryScore
   * @description - Carry score is calculated by counting each 100 meters as 1 rep.
   * @param {Int} totalMeters 
   * @param {Int} trips 
   * @return {Int} Score 
   * @memberof Metrics
   */
  calculateCarryScore(totalMeters, trips) {
    return (totalMeters/100) * trips;
  }

  sortLeaderboard(a, b) {
    return a.totalTrips - b.totalTrips;
  }

}

module.exports = new Metrics();
