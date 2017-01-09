var Mock = require('mockjs');
var Random = Mock.Random;
Random.extend({
    wmImg: function(data){
        var name = [
        'https://proxy.huanleguang.com/?url=http://hlg_material.img-cn-hangzhou-internal.aliyuncs.com/20160923/3215139_170550_2925.png@310h_310w.png', 
        'https://proxy.huanleguang.com/?url=http://hlg_material.img-cn-hangzhou-internal.aliyuncs.com/20161223/3377363_175506_5830.png@800h_800w.png', 
        'https://proxy.huanleguang.com/?url=http://hlg_material.img-cn-hangzhou-internal.aliyuncs.com/20170105/3377363_111011_5773.png@800h_800w.png'
        ];
        return this.pick(name);
    },
    itemImg: function(data){
        var name = [
            'https://asearch.alicdn.com/bao/uploaded/i3/106580341263342056/TB2D6.AaxXlpuFjSsphXXbJOXXa_!!0-saturn_solar.jpg', 
            'https://img.alicdn.com/bao/uploaded/i4/TB1kmdiLXXXXXXVaFXXXXXXXXXX_!!0-item_pic.jpg', 
            'https://img.alicdn.com/bao/uploaded/i3/TB174AfLXXXXXX2XFXXXXXXXXXX_!!0-item_pic.jpg', 
            'https://img.alicdn.com/bao/uploaded/i4/TB1J9l1LpXXXXccXpXXXXXXXXXX_!!0-item_pic.jpg',
            'https://img-tmdetail.alicdn.com/bao/uploaded///img.alicdn.com/bao/uploaded/TB1vGJVNpXXXXafXpXXXXXXXXXX_!!0-item_pic.jpg'
        ];
        return this.pick(name);
    }
});

module.exports = {
     //  已投放的宝贝
    step2Items: {
        "status" : 1,
        "data" : {
            "items|10" : [
                {
                    "wmImg" : "@wmImg",
                    "itemImg" : "@itemImg",
                    "wmTop" : 0,
                    "wmLeft" : 0
                }
            ],
            "total" : 100
        }
    }
}