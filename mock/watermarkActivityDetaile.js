var Mock = require('mockjs');
var Random = Mock.Random;
Random.extend({
    wmImg: function(data) {
        var name = [
            'https://proxy.huanleguang.com/?url=http://hlg_material.img-cn-hangzhou-internal.aliyuncs.com/20160923/3215139_170550_2925.png@310h_310w.png',
            'https://proxy.huanleguang.com/?url=http://hlg_material.img-cn-hangzhou-internal.aliyuncs.com/20161223/3377363_175506_5830.png@800h_800w.png',
            'https://proxy.huanleguang.com/?url=http://hlg_material.img-cn-hangzhou-internal.aliyuncs.com/20170105/3377363_111011_5773.png@800h_800w.png'
        ];
        return this.pick(name);
    },
    itemImg: function(data) {
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
    success: {
        "status": 1,
        "data": {
            "items|10": [{
                "img": "http://img.alicdn.com/bao/uploaded/i2/TB13g.NNFXXXXbjXpXXYXGcGpXX_M2.SS2",
                "price": 199.00,
                "status|0-1": 1,
                "title": "冬季男士毛呢外套男短款韩版修身妮子大衣潮青年加厚休闲潮流帅气",
                "url": "https://detail.tmall.com/item.htm?spm=a220o.1000855.1998025129.1.vmyrUR&abtest=_AB-LR32-PR32&pvid=6b916a2c-eead-4d13-9520-37ec707f6be4&pos=1&abbucket=_AB-M32_B7&acm=03054.1003.1.1285741&id=540047042933&scm=1007.12559.61743.100200300000000",
                "itemId|10-30": 10,
                "isChecked": false,
                "time" : "2017-01-22 12:00:00"
            }]
        }
    },

    failed: {
        "status": 1,
        "data": {
            "items|10": [{
                "img": "http://img.alicdn.com/bao/uploaded/i2/TB13g.NNFXXXXbjXpXXYXGcGpXX_M2.SS2",
                "status|0-1": 1,
                "title": "冬季男士毛呢外套男短款韩版修身妮子大衣潮青年加厚休闲潮流帅气",
                "url": "https://detail.tmall.com/item.htm?spm=a220o.1000855.1998025129.1.vmyrUR&abtest=_AB-LR32-PR32&pvid=6b916a2c-eead-4d13-9520-37ec707f6be4&pos=1&abbucket=_AB-M32_B7&acm=03054.1003.1.1285741&id=540047042933&scm=1007.12559.61743.100200300000000",
                "itemId|10-30": 10,
                "isChecked": false,
                "time" : "2017-01-22 12:00:00",
                "season" : '@cparagraph'
            }]
        }
    }
}