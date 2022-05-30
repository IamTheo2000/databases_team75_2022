const db = require("../utils/database");

exports.getTopPairs = (req, res, next) => {
    let messages = req.flash('messages');
    if (messages.length == 0) messages = [];

    var project_id = req.query.project_id;
    db.query('SELECT help1.name, help2.name, COUNT(*)/2 AS pop' +
    ' FROM scientific_field as help1, scientific_field as help2, (SELECT LEAST(belongs_to_field.field_id, column2.field_id) as column1, GREATEST(belongs_to_field.field_id, column2.field_id) as column2'+
                ' FROM (project JOIN belongs_to_field ON ( project.project_id = belongs_to_field.project_id))'+ 
                ' JOIN belongs_to_field AS column2 ON ( project.project_id = column2.project_id)'+ 
                ' WHERE belongs_to_field.field_id != column2.field_id) AS cols'+
    ' WHERE help1.field_id = cols.column1 AND help2.field_id = cols.column2'+ 
    ' GROUP BY help1.name, help2.name'+
    ' ORDER BY pop DESC'+
    ' LIMIT 3')
    .then(({rows, fields}) => {
        res.render('data.ejs',{
            display_data: rows,
            result_string: 'Top Field Pairs',
            pop_up: false,
            options: false,
            options: false,
            search_field: false,
            display_data_keys: Object.keys(rows[0]),
        });
    })
    .catch(err => console.log(err))
};