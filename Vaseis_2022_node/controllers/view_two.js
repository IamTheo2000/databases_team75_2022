const db = require("../utils/database");

exports.getViewTwo = (req, res, next) => {
    let messages = req.flash('messages');
    if (messages.length == 0) messages = [];
    
    db.query('SELECT * FROM project_program_organisation')
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


// The query used to create the view

// CREATE VIEW project_program_organisation AS
// SELECT project.project_id, (project.title) AS Project_Title, (organisation.name) AS Organisation_Name, (program.name) AS Program_Name
// FROM project, program, organisation
// WHERE project.program_id = program.program_id AND project.organisation_id = organisation.organisation_id 
// ORDER BY project_id