const express = require('express');
const { getViewTwo } = require('../controllers/view_two');
const router  = express.Router();

//When you get the url
router.get('/', getViewTwo);

module.exports = router;