const flash = require("connect-flash/lib/flash");
var express = require("express");
const session = require('express-session');

var app =express();
//Middleware
app.use(express.static('views'));

app.set("views","./views");
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended :true}));
app.use(flash());
app.use(session({
    secret: "ThisShouldBeSecret",
    resave: false,
    saveUninitialized: false,
}));

const dashboard = require('./routes/dashboard');
const programs = require('./routes/programs');
const projects = require('./routes/projects');
const proj_res = require('./routes/proj_res');

app.use('/dashboard', dashboard);
app.use('/programs', programs);
app.use('/projects', projects);
app.use('/proj_res', proj_res);

app.use((req,res,next) => {res.status(404).render('404.ejs')});
module.exports = app;