const db = require("../utils/database");

exports.getTopExecutives = (req, res, next) => {
    let messages = req.flash('messages');
    if (messages.length == 0) messages = [];

    var project_id = req.query.project_id;
    db.query('SELECT top5.executive_name, organisation.name AS organisation_name, top5.amount'+
    ' FROM project, executive, organisation,'+
        ' (SELECT executive.name as executive_name, MAX(project.amount) as amount'+
        ' FROM executive, project, organisation, company'+
        ' WHERE executive.executive_id = project.executive_id'+
            ' AND organisation.organisation_id = project.organisation_id'+
            ' AND organisation.organisation_id = company.organisation_id'+
        ' GROUP BY executive_name'+
        ' ORDER BY amount DESC'+
        ' LIMIT 5) as top5'+
    ' WHERE executive.name = top5.executive_name'+
        ' AND organisation.organisation_id = project.organisation_id'+
        ' AND project.amount = top5.amount'+
    ' ORDER BY amount DESC')
    .then(({rows, fields}) => {
        res.render('data.ejs',{
            display_data: rows,
            result_string: 'Top Executives',
            pop_up: false,
            options: false,
            options: false,
            search_field: false,
            display_data_keys: Object.keys(rows[0]),
        });
    })
    .catch(err => console.log(err))
};