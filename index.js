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
// middleware
app.all ("*", (req, res, next) => {
  console.log("el usuario le está dando click a", req.path);
  next();
});
app.get('/holi', (req, res) => {
  res.send('Holiii');
});
app.post('/holi', (req, res) => {
  res.send("Holiiii 2");
});
app.get('/bai',(req, res) => {
  res.send('se acabo');
});
app.listen(3000, function () {
  console.log('My app listening on port 3000!');
});
