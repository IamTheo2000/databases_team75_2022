const db = require("../utils/database");

// exports.getProjects = (req, res, next) => {
//     let messages = req.flash('messages');
//     if (messages.length == 0) messages = [];

    

//     db.query('SELECT * FROM project')
//     .then(({rows, fields}) => {
//         res.render("data.ejs", {
//             result_string: 'Projects',
//             display_data: rows,
//             display_data_keys: Object.keys(rows[0]),
//             search_field: true,
//             pop_up:true,
//         });
//     })
//     .catch(err => console.log(err))
// };

exports.getProjectsParameters = (req, res, next) => {
    var input_date = req.body.input1;
    var input_duration = req.body.input2;
    var input_executive = req.body.input3;
    
    if (!input_date) {input_date = String("2000-01-01")}
    if (!input_executive) {input_executive = 0}
    if (!input_duration) {input_duration = -1}

    db.query("SELECT * FROM project WHERE ($1 = 0 OR executive_id = $1) AND ($2 = '2000-01-01'::date OR start_date = $2) AND ($3 = -1 OR (end_date IS NOT NULL AND (DATE_PART('year', AGE(end_date, start_date))*12 + DATE_PART('month', AGE(end_date, start_date)) = $3)))",[input_executive,input_date, input_duration])
    .then(({rows, fields}) => {
        if (rows.length == 0) {
            res.render("data.ejs", {
                result_string: 'Projects (No data found)',
                display_data: "No data found",
                display_data_keys: [],
                search_field: true,
                pop_up: true,
            }); 
        } else {
            res.render("data.ejs", {
                result_string: 'Projects',
                display_data: rows,
                display_data_keys: Object.keys(rows[0]),
                search_field: true,
                pop_up: true,
            });
        }
    })
    .catch(err => console.log(err))
};