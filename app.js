// imports
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

// Templating Engine
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const consumer = require('./src/routes/consumer');
app.use('/', consumer);

const seller = require('./src/routes/seller');
app.use('/s', seller);

module.exports = app;
