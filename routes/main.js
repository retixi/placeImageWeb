var express = require('express');
var router = express.Router();
var db=require('../db').db
var bodyParser=require('body-parser')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/list',function (req,res) {
    db.facilities.find(function (err,docs) {
        res.render('list.html',{results:docs});
    });
});


router.post('/add',function (req,res) {
    require('crypto').randomBytes(16, function(ex, buf) {
        var token = buf.toString('hex');
        var facility = {FID:token,
                    title:req.body.title,
                    place:req.body.place,
                    detail:req.body.detail,
                    link:"http://localhost:3000/detail/"+token};
        db.facilities.insert(facility,function (err,doc) {
            res.redirect('/list')
        })

    })



    })

router.get('/del/:fid',function (req,res) {
    db.facilities.remove({FID:req.params.fid},function (err,doc) {
        console.log('req.params.fid')
        res.redirect('/list')
    })
});

router.get('/detail/:fid',function (req,res) {
    db.facilities.findOne({FID:req.params.fid},function (err,doc) {
        console.log(req.params.fid);
        res.render('detail.html',{result:doc})
    })
});


router.post('/update/:fid',function (req,res) {
    db.facilities.findAndModify({
        query: {FID: req.params.fid},
        update: {title:req.body.title,
                place:req.body.place,
                FID:req.params.fid,
                detail:req.body.detail,
                link:"http://localhost:3000/detail/"+req.params.fid}
    },
        function (err,doc) {
    res.redirect('/list')
    })

});


router.get('/update',function (req,res) {
    res.render('update.html',{title:req.query.title})
        });

router.get('/login',function (req,res) {
    res.render('login.html')
});

router.post('/login',function (req,res) {
    if(req.body.id === "rtx" && req.body.password === "rtx")
        {res.redirect("/list")}
    else
        {res.redirect("/login")}
});
router.get('/',function (req,res) {
    res.redirect('/login')
});




    module.exports = router;