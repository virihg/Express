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



app.listen(3000, function () {
  console.log('My app listening on port 3000!');
});
