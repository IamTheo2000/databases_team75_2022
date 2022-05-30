const express = require('express');
const { getViewOne } = require('../controllers/view_one');
const router  = express.Router();

//When you get the url
router.get('/', getViewOne);

module.exports = router;