var express = require('express');
var app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
let books = [];
// Metodo Get
app.all('/hello', function (req, res) {
  res.send('Hello World!');
});
app.all('/bye', function (req, res) {
  res.send('Bye bye :)');
});
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/assets', express.static(path.join(__dirname, 'assets')))
// middleware
app.all ("*", (req, res, next) => {
  console.log("el usuario le está dando click a", req.path);
  next();
});
app.get('/holi', (req, res) => {
  res.send("Holiii");
});
app.post('/holi', (req, res) => {
  res.send("Holiiii 2");
});
app.get('/bai',(req, res) => {
  res.send('se acabo');
});
app.get("/books", (req, res) => {
  res.status(200).send({data:books});
});

app.post("/books", (req, res) => {
  if (req.body.book && req.body.author){
    books.push(req.body);
    res.status(201).send("ya quedo");
  } else {
    res.status(400).send({error: "yo need tod pass book and author"})
  }
});
app.listen(3000, function () {
  console.log('My app listening on port 3000!');
});
