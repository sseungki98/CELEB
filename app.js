// imports
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/src/public/css'));
app.use('/js', express.static(__dirname + '/src/public/js'));
app.use('/img', express.static(__dirname + '/src/public/img'));

// Templating Engine
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const consumer = require('./src/routes/consumer');
app.use('/', consumer);

const seller = require('./src/routes/seller');
app.use('/s', seller);

module.exports = app;
