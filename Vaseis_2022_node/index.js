const flash = require("connect-flash/lib/flash");
var express = require("express");
const session = require('express-session');

//Options for app
var app =express();
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

//Routes
const dashboard = require('./routes/dashboard');
const programs = require('./routes/programs');
const projects = require('./routes/projects');
const proj_res = require('./routes/proj_res');
const view_one = require('./routes/view_one');
const view_two = require('./routes/view_two');
const field = require('./routes/field');
const same_num_of_projects = require('./routes/same_num_of_projects');
const top_pairs = require('./routes/top_pairs');
const new_res = require('./routes/new_res');
const top_execs = require('./routes/top_execs');
const res_mt5 = require('./routes/res_mt5');

//Uses
app.use('/', dashboard);
app.use('/dashboard', dashboard);
app.use('/programs', programs);
app.use('/projects', projects);
app.use('/proj_res', proj_res);
app.use('/view_one', view_one);
app.use('/view_two', view_two);
app.use('/field', field);
app.use('/same_num_of_projects', same_num_of_projects);
app.use('/top_pairs', top_pairs);
app.use('/new_res', new_res);
app.use('/top_execs', top_execs);
app.use('/res_mt5', res_mt5);

//404 page
app.use((req,res,next) => {res.status(404).render('404.ejs')});
module.exports = app;