const app = require('./app.js');
const cron = require('node-cron');

const port = 3001;

// CRON TASKS
/* 
! NOT SURE YET IF THIS 100% WORKS
! BUT SO FAR IT DOES THE JOB, IT UPDATES THE DB EVERY 10 MINS
! CONFIGURE THE FORMAT AS YOU FIT SINCE WE ARE STILL IN DEV
*/ 
cron.schedule('*/10 * * * *', () => {
  console.log('Dev mode no fetching to DB!');
  // insertFAQsToDatabase();
});

// Start server
const startServer = () => {
  app.listen(port, () => {
    console.log(`🚀 Server is listening at http://localhost:${port}`);
  });
}

module.exports = startServer;
 
