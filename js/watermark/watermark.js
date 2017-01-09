Vue.component('wm-list', {
    template: '#wm-list',
    props: {
        items: Array,
        showCollect: {
            type: Boolean,
            default: true
        }
    },
    data: function(){
        return {
            
        }
    },
    methods: {
        loadmore: function(){
            this.$emit('loadmore');
        },
        openEditor: function(){

        },
        publish: function(){

        },
        collect: function(index){
            this.$emit('collect', index);
        }
    }
})

var WMconponents = {
    /**
    * @描述：已投放水印图标组件；
    */
    used: {
        template: '#used-watermark',
        data: function(){
            return {
                planName: '',
                searchText: '',
                items: [],
                busy: false,
                searchActive: false
            }
        },
        created: function(){

        },
        methods: {
            focusSearch: function(){
                this.searchActive = true;
            },
            blurSearch: function(){
                this.searchActive = false;
            },
            search: function(){
                var vm = this;
                $.ajax({
                    url: 'http://127.0.0.1:3030/watermark/used',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        templateName: vm.searchText
                    }
                })
                .done(function(data){
                    debugger
                    vm.items = data.data.items;
                })
            },
            loadmore: function(){
                var vm = this;
                vm.busy = true;
                $.ajax({
                    url: ' http://127.0.0.1:3030/watermark/used',
                    type: 'GET',
                    dataType: 'json',
                })
                .done(function(data) {
                    vm.items = vm.items.concat(data.data.items);
                    vm.busy = false;
                })
            }
        }
    },

    /**
    * @描述：可投放水印图标组件；
    */
    all: {
        template: '#all-watermark',
        data: function(){
            return {
                wmType: ['全部', '折扣水印', '普通水印', '我的收藏', '我的设计'],
                wmTitle: ['全部', '节日', '上新', '包邮', '清仓', '秒杀', '双11', '其他'],
                isTypeActive: 0,
                isThemeActive: 0,
                showPop: false,
                items: [],
                busy: false,
                currentPage: 0,
                loading: false
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
                this.items[index].isCollect = !this.items[index].isCollect;
            },
            openEditor: function(){
                window.open('./wmEditor.html');
            },
            loadmore: function(){
                var vm = this;
                vm.busy = true;
                vm.loading = true;
                $.ajax({
                    url: 'http://127.0.0.1:3030/watermark/all',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        page: vm.currentPage + 1
                    }
                })
                .done(function(data){
                    vm.items = vm.items.concat(data.data.items);
                    vm.busy = false;
                    vm.currentPage += 1;
                    vm.loading = false
                    if(data.data.items.length === 0){
                        vm.busy = true;
                    }
                })
            }
        }
    },

    /**
    * @描述：已投放的宝贝组件；
    */
    items: {
        template: '#items-joined',
        data: function(){
            return {
                publishStatus: ['全部状态', '投放失败', '投放成功', '正在投放', '退出失败'],
                currentStatus: 0,
                items: [],
                page: 0,
                busy: false,
                searchActive: false,
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
            focusSearch: function(){
                this.searchActive = true;
            },
            blurSearch: function(){
                this.searchActive = false;
            },
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
                url: ' http://127.0.0.1:3030/watermark/items',
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

    /**
    * @描述：我收藏的水印组件；
    */
    collect: {
        template: '#my-collect',
        data: function(){
            return {
                busy: false,
                loading: false,
                currentPage: 0,
                items: []
            }
        },
        methods: {
            collect: function(){

            },
            loadmore: function(){
                var vm = this;
                vm.busy = true;
                vm.loading = true;
                $.ajax({
                    url: 'http://127.0.0.1:3030/watermark/all',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        page: vm.currentPage + 1
                    }
                })
                .done(function(data){
                    vm.items = vm.items.concat(data.data.items);
                    vm.busy = false;
                    vm.currentPage += 1;
                    vm.loading = false
                    if(data.data.items.length === 0){
                        vm.busy = true;
                    }
                })
            }
        }
    }
}

var routes = [
    { path: '/used', component: WMconponents.used },
    { path: '/all', component: WMconponents.all },
    { path: '/items', component: WMconponents.items },
    { path: '/collect', component: WMconponents.collect },
    { path: '*', component: WMconponents.used }
]
var router = new VueRouter({
    routes: routes
})
var Watermark = new Vue({
    el: '#watermark',
    router: router
})
