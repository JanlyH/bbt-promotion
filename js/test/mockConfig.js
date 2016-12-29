var Random = Mock.Random;
Random.datetime();
Random.ctitle();

var items = Mock.mock({
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
})

Mock.mock('/getItems.json', function(options){
    if (options.body) {
        var page = options.body.split('=')[1];
    }
    if (!options.body || page <= 10) {
        return items
    }else{
        return {
            "status" : 1,
            "data" : {
                "items" : []
            }
        }
    }
})