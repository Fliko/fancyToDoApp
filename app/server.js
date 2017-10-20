const express = require('express');
const path = require('path');
const http = require('http');
const request = require('request');
let app = express();
let port = 8585;

app.use(express.static(path.join(__dirname)));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/route', function (req, res) {
  get(req.headers.url).then((data)=>{
    res.send(JSON.stringify(data))
  })
});
function get(url) {
  return new Promise(function(resolve, reject) {
    request(url,
      (error, response, body) => {
        if(error) return reject(error);
        resolve(JSON.parse(body));
      });
  });
}
app.listen(port,console.log(port));
