const express = require('express');
const { getTopPairs } = require('../controllers/top_pairs');
const router  = express.Router();

//When you get the url
router.get('/', getTopPairs);

module.exports = router;