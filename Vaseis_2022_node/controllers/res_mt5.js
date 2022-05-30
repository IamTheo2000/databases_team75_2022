const db = require("../utils/database");

exports.getResearchersMoreThanFiveProjects = (req, res, next) => {
    let messages = req.flash('messages');
    if (messages.length == 0) messages = [];

    var project_id = req.query.project_id;
    db.query("SELECT project_per_researcher.researcher_id, project_per_researcher.first_name, project_per_researcher.last_name, COUNT(*) as projects_involved"+
    " FROM project_per_researcher, project"+
    " WHERE project_per_researcher.relationship = 'worker' AND project_per_researcher.title = project.title"+
        " AND project.project_id NOT IN (SELECT project_id FROM delivery)"+
    " GROUP BY project_per_researcher.researcher_id, project_per_researcher.first_name, project_per_researcher.last_name"+
    " HAVING COUNT(*) > 4"+
    " ORDER BY projects_involved DESC")
    .then(({rows, fields}) => {
        res.render('data.ejs',{
            display_data: rows,
            result_string: 'Researchers',
            pop_up: false,
            options: false,
            options: false,
            search_field: false,
            display_data_keys: Object.keys(rows[0]),
        });
    })
    .catch(err => console.log(err))
};