var express = require("express");
const session = require('express-session');

var app =express();
//Middleware
app.use(express.static('views'));

app.set("views","./views");
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended :true}));

const dashboard = require('./controllers/dashboard');

app.use('/', dashboard);

module.exports = app;