var express = require('express');
var Mock = require('mockjs');
var app = express();
var router = express.Router();
var Random = Mock.Random;
Random.datetime();
Random.ctitle();

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Credentials','true');
    next();
});

//
var WMProfile = {
    //  已投放的宝贝
    items: Mock.mock({
        "status" : 1,
        "data" : {
            "items|10" : [
                {
                    "src" : "https://img.alicdn.com/bao/uploaded/i2/269169475/TB2YNt0XLPB11BjSsppXXcjYVXa_!!269169475.jpg",
                    "url" : "https://www.taobao.com/",
                    "price|10-1000.2" : 10,
                    "status|0-3" : 0,
                    "time" : "@datetime('yyyy-MM-dd HH:mm:ss')",
                    "planName" : "@ctitle(1, 15)",
                    "planDetailes" : "https://www.taobao.com/",
                    "title" : "@ctitle(1, 34)"
                }
            ]
        }
    }),

    // 已投放的水印
    used: Mock.mock({
        "status" : 1,
        "data" : {
            "items|10" : [
                {
                    "src" : "https://proxy.huanleguang.com/?url=http://hlg_material.img-cn-hangzhou-internal.aliyuncs.com/20160923/3215139_170550_2925.png@310h_310w.png",
                    "price|10-1000.2" : 10,
                    "status|0-3" : 0,
                    "startTime" : "@datetime('yyyy-MM-dd HH:mm:ss')",
                    "endTime" : "@datetime('yyyy-MM-dd HH:mm:ss')",
                    "planName" : "@ctitle(1, 10)",
                    "eventName" : "@ctitle(1, 10)",
                    "num|1-1000" : 10,
                    "successNum|1-999" : 10,
                    "failedNum|1-999" : 10
                }
            ]
        }
    }),

    //  所有的水印
    all: Mock.mock({
        "status" : 1,
        "data" : {
            "items|20" : [
                {
                    "src" : "https://proxy.huanleguang.com/?url=http://hlg_material.img-cn-hangzhou-internal.aliyuncs.com/20160923/3215139_170550_2925.png@310h_310w.png",
                    "type" : "折扣水印",
                    "isCollect|1" : false,
                    "wmID|1-1000" : 0001
                }
            ]
        }
    })
}

// 已投放宝贝
router.get('/watermark/items', (req, res) => {
    res.json(WMProfile.items)
})

router.get('/watermark/used', (req, res) => {
    res.json(WMProfile.used)
})

router.get('/watermark/all', (req, res) => {
    res.json(WMProfile.all)
})

app.use(router);
app.listen(3030, () => console.log('成功'));
