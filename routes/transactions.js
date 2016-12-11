var trans=require('../modules/trans');
var express = require('express');
var router = express.Router();
var db=require('../db').db
var bodyParser=require('body-parser')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/',function (req,res) {
    res.render('transactions.html')
})

router.post('/',function (req,res) {
    var salesinfo=req.body;
    trans.save(salesinfo)
    res.render('success.html')
})



module.exports=router

