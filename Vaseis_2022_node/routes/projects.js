const express = require('express');
const { getProjects, getProjectsParameters } = require('../controllers/projects');
const router  = express.Router();

//When you get the url
router.get('/', getProjects);
router.post('/', getProjectsParameters);

module.exports = router;