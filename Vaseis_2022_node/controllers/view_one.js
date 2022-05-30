const db = require("../utils/database");

exports.getViewOne = (req, res, next) => {
    let messages = req.flash('messages');
    if (messages.length == 0) messages = [];
    
    db.query('SELECT * FROM project_per_researcher')
    .then(({rows, fields}) => {
        res.render("data.ejs", {
            result_string: 'Researcher - Project',
            display_data: rows,
            display_data_keys: Object.keys(rows[0]),
            search_field: false,
            pop_up: false,
            options: false
        });
    })
    .catch(err => console.log(err))
};

// The query used to generate the view:

// CREATE VIEW project_per_researcher AS
// SELECT researcher.researcher_id, researcher.first_name, researcher.last_name, project.title, project.summary, ('director') as relationship
// FROM project, researcher
// WHERE project.researcher_id = researcher.researcher_id
// UNION
// SELECT researcher.researcher_id, researcher.first_name, researcher.last_name, project.title, project.summary, ('worker') as relationship
// FROM project, researcher, project_researcher
// WHERE project_researcher.researcher_id = researcher.researcher_id AND project_researcher.project_id = project.project_id
// UNION
// SELECT researcher.researcher_id, researcher.first_name, researcher.last_name, project.title, project.summary, ('reviewer') as relationship
// FROM project, review, researcher
// WHERE project.project_id = review.project_id AND review.researcher_id = researcher.researcher_id
// ORDER BY researcher_id;