const db = require("../utils/database");

exports.getSameNumberOfProjects = (req, res, next) => {
    let messages = req.flash('messages');
    if (messages.length == 0) messages = [];

    
    db.query('SELECT jsonb_agg(DISTINCT table1.name), (table1.erga + table2.erga) AS proj_num' +
    ' FROM' +
       ' (SELECT organisation.organisation_id, organisation.name, EXTRACT(YEAR FROM project.start_date) AS etos, COUNT(*) AS erga' +
       ' FROM organisation JOIN project ON organisation.organisation_id = project.organisation_id' +
       ' GROUP BY organisation.organisation_id, EXTRACT(YEAR FROM project.start_date)' +
       ' ) AS table1,' +
       ' (SELECT organisation.organisation_id, organisation.name, EXTRACT(YEAR FROM project.start_date) AS etos, COUNT(*) AS erga' +
       ' FROM organisation JOIN project ON organisation.organisation_id = project.organisation_id' +
       ' GROUP BY organisation.organisation_id, EXTRACT(YEAR FROM project.start_date)' +
       ' ) AS table2' +
     ' WHERE table1.organisation_id = table2.organisation_id AND table1.etos + 1 = table2.etos' +
     ' GROUP BY proj_num')
    .then(({rows, fields}) => {
        if (rows.length != 0) {
            res.render('data.ejs',{
                display_data: rows,
                result_string: 'Organisations with same number of projects',
                pop_up: false,
                options: false,
                search_field: false,
                display_data_keys: Object.keys(rows[0]),
            });
        } else {
            res.render('data.ejs',{
                display_data: [],
                result_string: 'No Data Found',
                pop_up: false,
                options: false,
                search_field: false,
                display_data_keys: [],
            });
        }
    })
    .catch(err => console.log(err))
};