const express = require('express');
const path = require('path');

const app = express();
const port = 9000;

app.use(express.static(path.join(__dirname)));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/app/public/index.html'));
});

app.listen(port, function() {
  console.log('listening on ' + port);
});
