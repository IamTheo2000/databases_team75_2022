const express = require('express');
const { getResearchersMoreThanFiveProjects } = require('../controllers/res_mt5');
const router  = express.Router();

//When you get the url
router.get('/', getResearchersMoreThanFiveProjects);

module.exports = router;