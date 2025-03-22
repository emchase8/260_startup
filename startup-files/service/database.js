const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('startup');
const user_collection = db.collection('user');
const score_collection = db.collection('scores');

//testing connection so hopefully things don't break
(async function testConnection() {
    try {
      await db.command({ ping: 1 });
    } catch (ex) {
      console.log(`Unable to connect to database with ${url} because ${ex.message}`);
      process.exit(1);
    }
  })();

//adds a score to the db
async function add_scores(score) {
    return score_collection.insertOne(score);
}

//returns the ten lowest scores
function best_scores() {
    const query = {score: {$gt: 0, $lt: 30}};
    const options = {sort: {score: 1}, limit: 10,};
    const cursor = score_collection.find(query, options);
    return cursor.toArray();
}

//adds a user to the db
async function add_user(user) {
    return user_collection.insertOne(user);
}

//allows user to be found by token
function get_by_token(token) {
    return user_collection.findOne({token: token});
}

function get_by_email(email) {
    return user_collection.findOne({email: email});
}

async function update_existing_user(user) {
    await user_collection.updateOne({email: user.email},{$set: user});
}

module.exports = {
    add_scores,
    best_scores,
    add_user,
    get_by_token,
    get_by_email,
    update_existing_user,
}