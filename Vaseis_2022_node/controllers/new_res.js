const db = require("../utils/database");

exports.getYoungResearchers = (req, res, next) => {
    let messages = req.flash('messages');
    if (messages.length == 0) messages = [];

    db.query("SELECT researcher.researcher_id, researcher.first_name, researcher.last_name, researcher.date_of_birth, COUNT(*) AS projects"+
    " FROM researcher, project_per_researcher"+
    " WHERE DATE_PART('year', AGE(CURRENT_DATE, researcher.date_of_birth)) < 40"+
        " AND researcher.researcher_id = project_per_researcher.researcher_id"+ 
        " AND project_per_researcher.relationship = 'worker'"+
    " GROUP BY researcher.researcher_id, researcher.first_name, researcher.last_name, researcher.date_of_birth"+
    " ORDER BY projects DESC")
    .then(({rows, fields}) => {
        res.render('data.ejs',{
            display_data: rows,
            result_string: 'Young researchers',
            pop_up: false,
            options: false,
            options: false,
            search_field: false,
            display_data_keys: Object.keys(rows[0]),
        });
    })
    .catch(err => console.log(err))
};