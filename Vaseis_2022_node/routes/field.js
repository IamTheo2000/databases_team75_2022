const express = require('express');
const { getField } = require('../controllers/field');
const router  = express.Router();

//When you get the url
router.get('/', getField);
router.post('/', getField);

module.exports = router;