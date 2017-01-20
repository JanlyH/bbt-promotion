Vue.component('pagination', {
    template: '#pagination',
    props: {
        total: Number,
        currentPage: Number,
        pageSize: {
            type: Number,
            default: 10
        }
    },
    data: function() {
        return {

        }
    },
    computed: {
        pageCount: function() {
            return Math.ceil(this.total / this.pageSize)
        },
        pageList: function() {
            // 根据当前页生成动态页码
            if (this.pageCount <= 10) {
                return _.fill(Array(this.pageCount)).map(function(item, index) {
                    return index + 1;
                });
            }
            // dynamicPages 为除第一页和最后一页之外的页码，-1 表示省略号
            var dynamicPages;
            switch (this.currentPage) {
                case 1:
                    dynamicPages = [2, 3, 4, 5, 6, -2];
                    break;
                case 2:
                    dynamicPages = [2, 3, 4, 5, 6, -2];
                    break;
                case 3:
                    dynamicPages = [2, 3, 4, 5, 6, -2];
                    break;
                case 4:
                    dynamicPages = [2, 3, 4, 5, 6, -2];
                    break;
                case 5:
                    dynamicPages = [2, 3, 4, 5, 6, -2];
                    break;
                case this.pageCount - 2:
                    dynamicPages = [-1, this.currentPage - 2, this.currentPage - 1, this.currentPage, this.currentPage + 1];
                    break;
                case this.pageCount - 1:
                    dynamicPages = [-1, this.currentPage - 2, this.currentPage - 1, this.currentPage];
                    break;
                case this.pageCount:
                    dynamicPages = [-1, this.currentPage - 2, this.currentPage - 1];
                    break;
                default:
                    dynamicPages = [-1, this.currentPage - 2, this.currentPage - 1, this.currentPage, this.currentPage + 1, this.currentPage + 2, -2];
            }
            dynamicPages.unshift(1);
            dynamicPages.push(this.pageCount);
            return dynamicPages;
        }
    },
    methods: {
        pageChange: function(event) {
            var target = event.target;
            var newPage = Number(target.textContent);
            if (target.className.indexOf('prev-skip') !== -1) {
                newPage = this.currentPage - 5;
            }
            if (target.className.indexOf('next-skip') !== -1) {
                newPage = this.currentPage + 5;
            }
            if (target.className.indexOf('prev-page') !== -1 && this.currentPage !== 1) {
                newPage = this.currentPage - 1;
            }
            if (target.className.indexOf('next-page') !== -1 && this.currentPage !== this.pageCount) {
                newPage = this.currentPage + 1;
            }
            if (newPage < 1) {
                newPage = 1;
            }
            if (newPage > this.pageCount) {
                newPage = this.pageCount;
            }
            if (newPage !== this.currentPage && newPage > 0) {
                this.$emit('page-change', newPage)
            }
        }
    }
})
var detailsCompontent = {
    success: {
        template: '#successItems',
        props: {
            title: String
        },
        data: function(){
            return {
                items: [],
                total: 100,
                currentPage: 1,
                API: 'http://192.168.1.146:3030/wartermark/activityDetaile/success'
            }
        },

        created: function() {
            var vm = this;
            vm.request().done(function(data){
                vm.items = data.data.items;
            })
        },

        computed: {
            selectedNum: function() {
                return 0;
            },

            isCheckAll: function(){
                var num = 0;
                this.items.forEach(function(item) {
                    if (item.isChecked) {
                        num += 1
                    }
                })
                return this.items.length === num;
            }
        },
        methods: {
            request: function(){
                return $.ajax({
                    url: this.API,
                    type: 'POST',
                    dataType: 'json',
                    data: {pageNo: this.currentPage, title: this.title}
                })
            },

            check: function(item, index){
                this.items[index].isChecked = !this.items[index].isChecked;
            },

            checkAll: function(){
                if (this.isCheckAll) {
                    this.items.forEach(function(item) {
                        item.isChecked = false;
                    })
                } else {
                    this.items.forEach(function(item) {
                        item.isChecked = true;
                    })
                }
                this.isCheckAll = !this.isCheckAll;
            },

            changePage: function(val){
                var vm = this;
                vm.currentPage = val;
                vm.request().done(function(data){
                    vm.items = data.data.items;
                })
            },

            batchPublish: function(){

            },

            // 缓存当前页选中的宝贝
            cacheItems: function() {
                var vm = this, arr = [], cache = vm.cache;
                vm.items.forEach(function(item, index) {
                    if (cache.items.length > 0) {
                        var flag = true;
                        cache.items.forEach(function(cacheItem, cacheIndex) {
                            if (item.itemId === cacheItem.itemId) {
                                item.isChecked || cache.items.splice(cacheIndex, 1);
                                flag = false;
                            }
                        })
                        if (flag && item.isChecked) {
                            arr.push(item);
                        }
                    } else if (item.isChecked) {
                        arr.push(item);
                    }
                })
                cache.items.push.apply(cache.items, arr);
            },

            // 检查缓存的宝贝
            checkCache: function () {
                var vm = this,
                    items = vm.items,
                    cache = vm.cache;
                if (cache.items.length > 0) {
                    itemsFor: for (var j = 0; j < vm.items.length; j++) {
                        cacheFor: for (var i = 0; i < vm.cache.items.length; i++) {
                            if (items[j].itemId === cache.items[i].itemId) {
                                items[j] = cache.items[i];
                                break cacheFor;
                            }
                        }
                    }
                }
            }
        }
    },

    failed: {
        template: '#failedItems',
        props: {
            title: String
        },
        data: function(){
            return {
                items: [],
                total: 100,
                currentPage: 1,
                API: 'http://192.168.1.146:3030/wartermark/activityDetaile/failed'
            }
        },

        created: function() {
            var vm = this;
            vm.request().done(function(data){
                vm.items = data.data.items;
            })
        },

        computed: {
            selectedNum: function() {
                return 0;
            },

            isCheckAll: function(){
                var num = 0;
                this.items.forEach(function(item) {
                    if (item.isChecked) {
                        num += 1
                    }
                })
                return this.items.length === num;
            }
        },
        methods: {
            request: function(){
                return $.ajax({
                    url: this.API,
                    type: 'POST',
                    dataType: 'json',
                    data: {pageNo: this.currentPage, title: this.title}
                })
            },

            check: function(item, index){
                this.items[index].isChecked = !this.items[index].isChecked;
            },

            checkAll: function(){
                if (this.isCheckAll) {
                    this.items.forEach(function(item) {
                        item.isChecked = false;
                    })
                } else {
                    this.items.forEach(function(item) {
                        item.isChecked = true;
                    })
                }
                this.isCheckAll = !this.isCheckAll;
            },

            changePage: function(val){
                var vm = this;
                vm.currentPage = val;
                vm.request().done(function(data){
                    vm.items = data.data.items;
                })
            },

            batchPublish: function(){

            },

            // 缓存当前页选中的宝贝
            cacheItems: function() {
                var vm = this, arr = [], cache = vm.cache;
                vm.items.forEach(function(item, index) {
                    if (cache.items.length > 0) {
                        var flag = true;
                        cache.items.forEach(function(cacheItem, cacheIndex) {
                            if (item.itemId === cacheItem.itemId) {
                                item.isChecked || cache.items.splice(cacheIndex, 1);
                                flag = false;
                            }
                        })
                        if (flag && item.isChecked) {
                            arr.push(item);
                        }
                    } else if (item.isChecked) {
                        arr.push(item);
                    }
                })
                cache.items.push.apply(cache.items, arr);
            },

            // 检查缓存的宝贝
            checkCache: function () {
                var vm = this,
                    items = vm.items,
                    cache = vm.cache;
                if (cache.items.length > 0) {
                    itemsFor: for (var j = 0; j < vm.items.length; j++) {
                        cacheFor: for (var i = 0; i < vm.cache.items.length; i++) {
                            if (items[j].itemId === cache.items[i].itemId) {
                                items[j] = cache.items[i];
                                break cacheFor;
                            }
                        }
                    }
                }
            }
        }
    }
}
var Watermark = new Vue({
    el: '#activityDetaile',
    data: {
        tabs: ['投放成功', '投放失败'],
        currentTab: 0,
        title: '',
        failedAPI: 'http://192.168.1.146:3030/wartermark/activityDetaile/failed',
        currentView: detailsCompontent.success
    },

    methods: {
        changeTab: function(index){
            this.currentTab = index;
            index === 0 ? this.currentView = detailsCompontent.success : this.currentView = detailsCompontent.failed;
        },

        queryTitle: function(){
            var url, vm = this;
            vm.successCurrentPage = 1;
            vm.currentTab === 0 ? url = vm.successAPI : url = vm.failedAPI;
            var opt = {
                url: url,
                data: {pageNo: vm.successCurrentPage, title: vm.title}
            }
            vm.request(opt).done(function(data){
                
            })
        }
    }
})