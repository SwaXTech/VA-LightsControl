const ewelink = require('ewelink-api');
const express = require('express');
const config  = require('./config');
const app = express();

app.use( express.json() );
app.use(express.urlencoded({
  extended: true
})); 

const connection = new ewelink({
  email: config.email,
  password: config.password,
  region: config.region,
});

app.post('/ewelink/toggle-lights-state', (req, res) => {
  const key = req.body.secret_key;
  if (key !== config.secret_key) {
    res.status(401).send('Unauthorized');
    return;
  }
  (async () => await connection.toggleDevice(config.device_id))();
  res.status(200).send('Ok');
});

app.listen(24444, function () {
  console.log('Virtual Assistant Lights Control listening on port 24444.');
});
