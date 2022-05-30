const express = require('express');
const { getYoungResearchers } = require('../controllers/new_res');
const router  = express.Router();

//When you get the url
router.get('/', getYoungResearchers);

module.exports = router;