const express = require('express');
const { getTopExecutives } = require('../controllers/top_execs');
const router  = express.Router();

//When you get the url
router.get('/', getTopExecutives);

module.exports = router;