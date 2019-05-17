var express = require('express');
var app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
let books = [];
const privatekey = "megustanlosgatos"
//  Lllamada a todos los metodos-Ejercicio 1
app.all('/hello', function (req, res) {
  res.send('Hello World!');
});
app.all('/bye', function (req, res) {
  res.send('Bye bye :)');
});
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/assets', express.static(path.join(__dirname, 'assets')))
// middleware' Ejercicio 2
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
// Agregar registro- Ejercicio 3
});
app.get("/books", (req, res) => {
  console.log(req.cookies);
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
// Autentificación/Login- Ejercicio 4

app.post('/auth/signin', (request, response) => {
    if (!(request.body.user && request.body.pass)) {
        response.status(400).send("Se necesita usuario y contraseña!")
    } else {

        jwt.sign({ user: request.body.user, theme: 'black' }, privateKey, function (err, token) {
            if (err) {
                response.send(500).end();
            } else {
                response.status(200).send({ token: token })
            }
        });
    }
});

//middleware
app.use((request, response, next) => {
    jwt.verify(request.headers.authorization, privateKey, function (err, decoded) {
        if (err) {
            response.status(500).end('Algo sucedio mal :/')
        } else {
            console.log(decoded)
            // checar ese usuario en la base datos a ver si existe
            next();
        }
    });
});

//otro endpoint
app.get('/fin', (request, response) => {
    response.send("Lo lograste, todo bien :)");
});

app.listen(3000, function () {
  console.log('My app listening on port 3000!');
});
