const mongoose = require('mongoose');

const connectionSting = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.CLUSTER}.qdxvt.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;

// database
const db = mongoose
  .connect(connectionSting, {
    autoIndex: true,
  })
  .then(() => console.log('Connected to database'))
  .catch((err:string) => console.log(err));

module.exports = db;
