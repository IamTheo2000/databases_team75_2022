const db = require("../utils/database");

exports.getPrograms = (req, res, next) => {
    let messages = req.flash('messages');
    if (messages.length == 0) messages = [];

    

    db.query('SELECT * FROM program')
    .then(({rows, fields}) => {
        res.render("data.ejs", {
            result_string: 'Programs',
            display_data: rows,
            display_data_keys: Object.keys(rows[0]),
            search_field: false,
            pop_up: false,
            options: false
        });
    })
    .catch(err => console.log(err))
};