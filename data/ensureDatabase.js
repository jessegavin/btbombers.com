const data = require('./setup');

let dbFailureReason = null;
let dbFailed = false;
let dbInitialized = false;

data.setup()
  .then(() => {
    dbInitialized = true;
  })
  .catch(reason => {
    dbFailureReason = reason;
  });

module.exports = (req, res, next) => {

  if (!dbInitialized) {
    res.send('Database is being initialized');
    return;
  }

  if (dbFailed) {
    res.status(500).send(dbFailureReason);
    return;
  }

  next();
};