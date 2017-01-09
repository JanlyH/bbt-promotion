var Mock = require('mockjs');
var Random = Mock.Random;
Random.extend({
    planName: function(data){
        var name = ['双11促销', '双12促销', '年货节促销', '春节大促', '年终大促', '99大促'];
        return this.pick(name);
    },
    activityName: function(data){
        var name = ['限时打折', '超级满就送', '首件优惠', '首件包邮'];
        return this.pick(name);
    }
});

module.exports = {
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
                    "planName" : "@planName",
                    "activityName" : "@activityName",
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