const db = require("../utils/database");

exports.getField = (req, res, next) => {
    let messages = req.flash('messages');
    if (messages.length == 0) messages = [];
    
    //Get the field and projects/researchers from form inputs
    var field = req.body.field_input;
    var type = req.body.project_researcher;
    //First time page is loaded it doesn't have data so render data.ejs with nothing
    if (!field) {
        res.render("data.ejs", {
            result_string: 'Field of Interest',
            display_data: [],
            display_data_keys: [],
            search_field: false,
            pop_up: false,
            options: true
        });
    } else {
        //If data was given do one of the following queries
        if (type == 'Projects') {
            //Query that gets some columns about projects that are in given field for last year
            db.query("SELECT project.project_id, project.title, project.summary, project.start_date"+
            " FROM project, scientific_field, belongs_to_field"+
            " WHERE belongs_to_field.project_id = project.project_id"+
                " AND scientific_field.field_id = belongs_to_field.field_id"+
                " AND project.end_date IS NULL"+
                " AND scientific_field.name = $1 AND DATE_PART('year', AGE(CURRENT_DATE, project.start_date)) < 1",[field]) 
            .then(({rows, fields}) => {
                //Load the data
                res.render("data.ejs", {
                    result_string: 'Field of Ineterst - ' + field,
                    display_data: rows,
                    display_data_keys: Object.keys(rows[0]),
                    search_field: false,
                    pop_up: false,
                    options: true
                });
            });
        } else {
            //Query that gets some columns about researchers that work on a project the past year
            db.query("SELECT project_per_researcher.researcher_id, project_per_researcher.first_name, project_per_researcher.last_name"+
            " FROM project_per_researcher, project, scientific_field, belongs_to_field"+
            " WHERE belongs_to_field.project_id = project.project_id AND project.title = project_per_researcher.title"+
                " AND scientific_field.field_id = belongs_to_field.field_id"+
                " AND project.end_date IS NULL AND scientific_field.name = $1 AND DATE_PART('year', AGE(CURRENT_DATE, project.start_date)) < 1",[field]) 
            .then(({rows, fields}) => {
                //Load the data
                res.render("data.ejs", {
                    result_string: 'Field of Ineterst - ' + field,
                    display_data: rows,
                    display_data_keys: Object.keys(rows[0]),
                    search_field: false,
                    pop_up: false,
                    options: true
                });
            });
        }
    }
};