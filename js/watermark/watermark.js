var WMconponents = {



    /**
    * @描述：已投放水印图标组件； 
    */
    usedWM: {
        template: '#used-watermark',
        data: function(){
            return {
                planName: '',
                eventName: '',
                items: [
                    {
                        planName: '20161111',
                        eventName: '20160914-17',
                        src: 'https://proxy.huanleguang.com/?url=http://hlg_material.img-cn-hangzhou-internal.aliyuncs.com/20160923/3215139_170550_2925.png@310h_310w.png',
                        startTime: '2016-11-11 00:00:00',
                        endTime: '2016-11-11 23:59:59',
                        num: 20,
                        successNum: 19,
                        failedNum: 1
                    },
                    {
                        planName: '20161111',
                        eventName: '20160914-17',
                        src: 'https://proxy.huanleguang.com/?url=http://hlg_material.img-cn-hangzhou-internal.aliyuncs.com/20151022/2469023_195152_9919.png@310h_310w.png',
                        startTime: '2016-11-11 00:00:00',
                        endTime: '2016-11-11 23:59:59',
                        num: 18,
                        successNum: 10,
                        failedNum: 8
                    },
                    {
                        planName: '20161111',
                        eventName: '20160914-17',
                        src: 'https://proxy.huanleguang.com/?url=http://hlg_material.img-cn-hangzhou-internal.aliyuncs.com/20151022/2469023_200023_87.png@310h_310w.png',
                        startTime: '2016-11-11 00:00:00',
                        endTime: '2016-11-11 23:59:59',
                        num: 15,
                        successNum: 10,
                        failedNum: 5
                    }
                ]
            }
        },
        methods: {
            search: function(){
                console.log(1)
            }
        }
    },

    /**
    * @描述：可投放水印图标组件； 
    */
    allWM: {
        template: '#all-watermark',
        data: function(){
            return {
                wmType: ['全部', '折扣水印', '普通水印', '我的收藏', '我的设计'],
                wmTitle: ['全部', '节日', '上新', '包邮', '清仓', '秒杀', '双11', '其他'],
                isTypeActive: 0,
                isThemeActive: 0,
                showPop: false,
                wmList: [{
                    src: 'https://proxy.huanleguang.com/?url=http://hlg_material.img-cn-hangzhou-internal.aliyuncs.com/20160923/3215139_170550_2925.png@310h_310w.png',
                    type: '折扣水印',
                    isCollect: false,
                    wmID: '0001'
                },
                {
                    src: 'https://proxy.huanleguang.com/?url=http://hlg_material.img-cn-hangzhou-internal.aliyuncs.com/20151022/2469023_195152_9919.png@310h_310w.png',
                    type: '普通水印',
                    isCollect: false,
                    wmID: '0002'
                }]
            }
        },
        methods: {
            selTypeCondition: function(index){
                this.isTypeActive = index;
            },
            selThemeCondition: function(index){
                this.isThemeActive = index;
            },
            collect: function(index){
                this.wmList[index].isCollect = !this.wmList[index].isCollect;
            },
            openEditor: function(){
                window.open('./wmEditor.html');
            }
        }
    },

    /**
    * @描述：已投放的宝贝组件； 
    */
    itemsJoined: {
        template: '#items-joined',
        data: function(){
            return {
                publishStatus: ['全部状态', '投放成功', '投放失败', '正在投放', '退出失败'],
                currentStatus: 0,
                items: [
                    {
                        src: 'https://img.alicdn.com/bao/uploaded/i2/269169475/TB2YNt0XLPB11BjSsppXXcjYVXa_!!269169475.jpg',
                        url: 'https://www.taobao.com/',
                        title: 'vcruan 2016秋冬刺绣帽衫加绒卫衣女宽松套头连帽外套韩版潮学生',
                        price: 168,
                        status: 0,
                        time: '2016-12-12  23:22:59',
                        planName: '20161111',
                        planDetailes: 'https://www.taobao.com/'
                    },
                    {
                        src: 'https://img.alicdn.com/bao/uploaded/i2/269169475/TB2YNt0XLPB11BjSsppXXcjYVXa_!!269169475.jpg',
                        url: 'https://www.taobao.com/',
                        title: 'vcruan 2016秋冬刺绣帽衫加绒卫衣女宽松套头连帽外套韩版潮学生',
                        price: 168,
                        status: 1,
                        time: '2016-12-12  23:22:59',
                        planName: '20161111',
                        planDetailes: 'https://www.taobao.com/'
                    },
                    {
                        src: 'https://img.alicdn.com/bao/uploaded/i2/269169475/TB2YNt0XLPB11BjSsppXXcjYVXa_!!269169475.jpg',
                        url: 'https://www.taobao.com/',
                        title: 'vcruan 2016秋冬刺绣帽衫加绒卫衣女宽松套头连帽外套韩版潮学生',
                        price: 168,
                        status: 2,
                        time: '2016-12-12  23:22:59',
                        planName: '20161111',
                        planDetailes: 'https://www.taobao.com/'
                    },
                    {
                        src: 'https://img.alicdn.com/bao/uploaded/i2/269169475/TB2YNt0XLPB11BjSsppXXcjYVXa_!!269169475.jpg',
                        url: 'https://www.taobao.com/',
                        title: 'vcruan 2016秋冬刺绣帽衫加绒卫衣女宽松套头连帽外套韩版潮学生',
                        price: 168,
                        status: 3,
                        time: '2016-12-12  23:22:59',
                        planName: '20161111',
                        planDetailes: 'https://www.taobao.com/'
                    }
                ]
            }
        },
        methods: {
            changeStatus: function(index){
                this.currentStatus = index;
            }
        }
    },
}


var Watermark = new Vue({
    el: '#watermark',
    data: {
        currentView: WMconponents.itemsJoined,
        nav: ['已投放的水印', '可投放的水印', '已投放的宝贝'],
        isActive: 2
    },
    methods: {
        changeTab: function(index){
            this.isActive = index;
            switch(index){
                case 0:
                    this.currentView = WMconponents.usedWM;
                    break;
                case 1:
                    this.currentView = WMconponents.allWM;
                    break;
                case 2:
                    this.currentView = WMconponents.itemsJoined;
                    break;
            }
        }
    }
})