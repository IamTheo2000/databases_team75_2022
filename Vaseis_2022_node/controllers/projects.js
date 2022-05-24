const db = require("../utils/database");

exports.getProjects = (req, res, next) => {
    let messages = req.flash('messages');
    if (messages.length == 0) messages = [];

    

    db.query('SELECT * FROM project')
    .then(({rows, fields}) => {
        res.render("data.ejs", {
            result_string: 'Projects',
            display_data: rows,
            display_data_keys: Object.keys(rows[0]),
            search_field: true,
        });
    })
    .catch(err => console.log(err))
};

exports.getProjectsParameters = (req, res, next) => {
    input_date = req.body.input1;
    input_duration = req.body.input2;
    input_executive = req.body.input3;
    
    if (!input_date) {input_date = String("2000-01-01")}
    if (!input_executive) {input_executive = 0}

    db.query("SELECT * FROM project WHERE ($1 = 0 OR executive_id = $1) AND ($2 = '2000-01-01'::date OR start_date = $2)",[input_executive,input_date])
    .then(({rows, fields}) => {
        res.render("data.ejs", {
            result_string: 'Projects',
            display_data: rows,
            display_data_keys: Object.keys(rows[0]),
            search_field: true,
        });
    })
    .catch(err => console.log(err))
};