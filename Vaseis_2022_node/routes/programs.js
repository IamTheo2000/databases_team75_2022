const express = require('express');
const { getPrograms } = require('../controllers/programs');
const router  = express.Router();

//When you get the url
router.get('/', getPrograms);


module.exports = router;