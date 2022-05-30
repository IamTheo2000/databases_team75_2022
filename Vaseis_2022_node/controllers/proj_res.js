const db = require("../utils/database");

exports.getProj_Res = (req, res, next) => {
    let messages = req.flash('messages');
    if (messages.length == 0) messages = [];

    var project_id = req.query.project_id;
    db.query('SELECT * FROM project_researcher, researcher WHERE (project_researcher.project_id = $1 AND project_researcher.researcher_id = researcher.researcher_id)',[project_id])
    .then(({rows, fields}) => {
        res.render("data.ejs", {
            result_string: 'Researchers for project ' + project_id,
            display_data: rows,
            display_data_keys: Object.keys(rows[0]),
            search_field: false,
            pop_up: false,
            options: false
        });
    })
    .catch(err => console.log(err))
};