// MODULE IMPORTS
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const CronJob = require('cron').CronJob; 
const twilio = require('twilio');
const accountSid = 'ACCT_SID';
const authToken = 'AUTH_TOKEN';
const client = new twilio(accountSid, authToken);
const app = express();

// CRON JOB
new CronJob('00 51 8 * * *', () => {
    request('https://api.openweathermap.org/data/2.5/weather?q=Oakland,us&mode=json&APPID=API_KEY', (err, response, body) => {
    if(err) {
        console.log(err)
    } else {
        let b = JSON.parse(body);
        client.messages.create({
            body: `todays weather: ${b.weather[0].description}`,
            to: 'MY NUMBER',
            from: 'TWILIO NUMBER'
        })
    }
})
}, null, true, 'America/Los_Angeles');

// SERVER CONFIG
app.listen(3000);