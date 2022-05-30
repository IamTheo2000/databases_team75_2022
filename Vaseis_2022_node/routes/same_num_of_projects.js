const express = require('express');
const { getSameNumberOfProjects } = require('../controllers/same_num_of_projects');
const router  = express.Router();

//When you get the url
router.get('/', getSameNumberOfProjects);

module.exports = router;