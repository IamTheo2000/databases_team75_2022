const express = require('express');
const { getProj_Res } = require('../controllers/proj_res');
const router  = express.Router();

//When you get the url
router.get('/', getProj_Res);

module.exports = router;