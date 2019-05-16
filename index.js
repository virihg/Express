var express = require('express');
var app = express();
const path = require("path");
// Metodo Get
app.all('/hello', function (req, res) {
  res.send('Hello World!');
});
app.all('/bye', function (req, res) {
  res.send('Bye bye :)');
});
app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.get('/algo1', function (req, res) {
  res.status(202).send('algo 1');
});
app.post('/algo2', function (req, res) {
  res.status(200).send({algo2: "perrito"});
});
app.patch('/algo3', function (req, res) {
  res.status(401).send('esto se actualizo');
});
app.listen(3000, function () {
  console.log('My app listening on port 3000!');
});
