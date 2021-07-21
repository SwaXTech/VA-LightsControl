const ewelink = require('ewelink-api');
const express = require('express');
const config  = require('./config');
const app = express();

const connection = new ewelink({
  email: config.email,
  password: config.password,
  region: config.region,
});

app.get('/ewelink/toggle-lights-state', (req, res) => {
  (async () => await connection.toggleDevice(config.device_id))();
  res.sendStatus(200);
});

app.listen(24444, function () {
  console.log('Virtual Assistant Lights Control listening on port 24444.');
});
