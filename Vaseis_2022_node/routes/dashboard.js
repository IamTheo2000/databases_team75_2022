const express = require('express');
const { dashboard_render } = require('../controllers/dashboard');
const router  = express.Router();

//When you get the url
router.get('/', dashboard_render);

module.exports = router;