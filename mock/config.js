var express = require('express');
var Mock = require('mockjs');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();


var WMProfile = require('./watermarkListModel');
var WMPublish = require('./watermarkPublishModel');
var WMActivity = require('./watermarkActivityDetaile');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Credentials','true');
    next();
});


// 已投放宝贝
router.route('/watermark/items')
    .get((req, res, next) => {
        setTimeout(function(){
            res.json(WMProfile.items)
        }, 1000)
    })
    .post((req, res, next) => {
        setTimeout(function(){
            res.json(WMProfile.items)
        }, 1000)
        console.log(req.body)
    })

router.route('/watermark/used')
    .get((req, res) => {
        setTimeout(function(){
            res.json(WMProfile.used)
        }, 1000)
    })
    .post((req, res) => {
        if (!req.body) {
            res.json(WMProfile.used)
        }else{
            var query = req.body.templateName;
            var cache = [].concat()
            console.log(query)
            var result = WMProfile.used.data.items.filter(function(item) {
                return (item.planName.indexOf(query) != -1 || item.activityName.indexOf(query) != -1)
            });
            console.log(result);
            var obj = {
                status: 1,
                data: {
                    items: result
                }
            }
            setTimeout(function(){
                res.json(obj);
            }, 400)
        }
    })

router.route('/watermark/all')
    .get((req, res) => {
        res.json(WMProfile.all)
    })
    .post((req, res) => {
         setTimeout(function(){
            res.json(WMProfile.all)
            console.log(req.body)
        }, 1000)
    })

router.route('/wartermark/publish/step2/items')
    .get((req, res) => {
        res.json(WMPublish.step2Items);
    })
    .post((req, res) => {
        setTimeout(function(){
            res.json(Mock.mock(WMPublish.step2Items));
        }, 1000)
        console.log(req.body.page)
    })

router.route('/wartermark/publish/step1/items')
    .get((req, res) => {
        res.json(Mock.mock(WMPublish.step1Items));
    })
    .post((req, res) => {
        // var request = require('request');
        // request.post({
        //     url: 'http://promotion.baobeituan.com' + req.url
        // } )
        // .on('response', function(response){
        //     res.json(response);
        //     // console.log(response)
        // })
        setTimeout(function(){
            res.json(Mock.mock(WMPublish.step1Items));
        }, 1000)
        console.log(req.body)
    })

router.route('/wartermark/activityDetaile/success')
    .get((req, res) => {
        res.json(Mock.mock(WMActivity.success));
    })
    .post((req, res) => {
        res.json(Mock.mock(WMActivity.success));
        console.log(req.body)
    })

router.route('/wartermark/activityDetaile/failed')
    .get((req, res) => {
        res.json(Mock.mock(WMActivity.failed));
    })
    .post((req, res) => {
        res.json(Mock.mock(WMActivity.failed));
        console.log(req.body)
    })

app.use(router);
app.listen(3030, () => console.log('成功'));
