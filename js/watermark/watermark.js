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
                loading: false,
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
                vm.loading= true;
                $.ajax({
                    url: 'http://192.168.1.146:3030/watermark/used',
                    type: 'GET',
                    dataType: 'json',
                })
                .done(function(data) {
                    vm.items = vm.items.concat(data.data.items);
                    vm.busy = false;
                    vm.loading= false;
                    if(data.data.items.length === 0){
                        vm.busy = true;
                    }
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
                wmType: [],
                wmTheme: [],
                isTypeActive: 0,
                isThemeActive: 0,
                showPop: false,
                items: [],
                busy: false,
                currentPage: 0,
                loading: false
            }
        },
        created: function(){
            var vm = this;
            vm.loading = true;
            $.ajax({
                url: 'http://127.0.0.1:3030/watermark/all',
                type: 'GET',
                dataType: 'json'
            })
            .done(function(data){
                vm.loading = false;
                vm.items = vm.items.concat(data.data.items);
                vm.wmType = data.data.type;
                vm.wmType.unshift({
                    'typeNum': 0,
                    'typeValue': '全部'
                })
                vm.wmTheme = data.data.theme;
                vm.wmTheme.unshift({
                    'typeNum': 0,
                    'themeValue': '全部'
                })
                vm.currentPage += 1;
            })
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
                if (vm.currentPage > 0) {
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
    },

    /**
    * @描述：已投放的宝贝组件；
    */
    items: {
        template: '#items-joined',
        data: function(){
            return {
                publishStatus: ['全部状态', '投放失败', '投放成功', '正在投放'],
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
            loadmore: function(){
                var vm = this;
                vm.busy = true;
                $.ajax({
                    url: 'http://127.0.0.1:3030/watermark/items',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        page: vm.page + 1
                    }
                })
                .done(function(data) {
                    if (data.status === 1 && data.data.items.length !== 0) {
                        vm.items = vm.items.concat(data.data.items);
                        if (vm.currentStatus === 0) {
                            vm.getItems = vm.items;
                        }else{
                            vm.getItems = vm.items.filter(function(item){
                                return item.status + 1 === vm.currentStatus
                            });
                        }
                        vm.page += 1;
                        vm.busy = false;
                    }
                    if (data.data.items.length === 0) {
                        vm.busy = true;
                    }
                })
            }
        }
    },

    /**
    * @描述：我收藏的水印组件；
    */
    myCollect: {
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
    },

    /**
    * @描述：我设计的水印组件；
    */
    myDesign: {
        template: '#my-design',
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
    { path: '/my-collect', component: WMconponents.myCollect },
    { path: '/my-design', component: WMconponents.myDesign },
    { path: '*', component: WMconponents.used }
]
var router = new VueRouter({
    routes: routes
})
var Watermark = new Vue({
    el: '#watermark',
    router: router
})
