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
                publishStatus: ['全部状态', '投放失败', '投放成功', '正在投放', '退出失败'],
                currentStatus: 0,
                items: [],
                page: 0,
                busy: false,
                itemList: []
            }
        },
        mounted: function(){
            
        },
        computed: {
            getItems: {
                get: function(){
                    return this.itemList
                },
                set: function(arr){
                    this.itemList = [].concat(arr);
                }
            }
        },
        methods: {
            changeStatus: function(index, item){
                this.currentStatus = index;
                if (index === 0) {
                    this.getItems = this.items;
                }else{
                    this.getItems = this.items.filter(function(item){
                        return item.status + 1 === index
                    });
                }
                // this.statusFilter()
            },
            statusFilter: function(){
                if (this.currentStatus === 0) {
                    this.getItems = this.items;
                }else{
                    this.getItems = this.items.filter(function(item){
                        return item.status + 1 === this.currentStatus
                    });
                }
            },
            loadmore: function(){
                var that = this;
                if (that.page > 0) {
                    that.busy = true;
                    $.ajax({
                        url: '/getItems.json',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            page: that.page
                        }
                    })
                    .done(function(data) {
                        if (data.status === 1 && data.data.items.length !== 0) {
                            that.items = that.items.concat(data.data.items);
                            if (that.currentStatus === 0) {
                                that.getItems = that.items;
                            }else{
                                that.getItems = that.items.filter(function(item){
                                    return item.status + 1 === that.currentStatus
                                });
                            }
                            // that.statusFilter();
                            that.page += 1;
                            that.$nextTick(function(){
                                that.busy = false;
                            })
                        }
                        if (data.data.items.length === 0) {
                            that.busy = true;
                        }
                    })
                }
            },
            textFilter: function(items, filter){
                return items.filter(function(item){
                    item.indexOf(filter) !== -1;
                })
            }
        },
        created: function(){
            var that = this;
            $.ajax({
                url: '/getItems.json',
                type: 'GET',
                dataType: 'json'
            })
            .done(function(data) {
                that.items = data.data.items;
                that.getItems = that.items;
                that.page += 1;
            })
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