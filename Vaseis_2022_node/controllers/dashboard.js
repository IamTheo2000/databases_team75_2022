const express = require('express');
const router  = express.Router();

//When you get the url
router.get('/', (req,res)=>{
    res.render('dashboard.ejs');
});

module.exports = router;