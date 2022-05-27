const express = require('express');
const { getProjects, getProjectsParameters } = require('../controllers/projects');
const router  = express.Router();

//When you get the url
router.get('/', getProjectsParameters);
router.post('/', getProjectsParameters);

module.exports = router;