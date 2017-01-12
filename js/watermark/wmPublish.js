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
    data: function(){
        return {
            
        }
    },
    computed: {
        pageCount: function(){
            return Math.ceil(this.total / this.pageSize)
        },
        pageList: function(){
            // 根据当前页生成动态页码
            if (this.pageCount <= 10) {
                return _.fill(Array(this.pageCount)).map(function(item, index){
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
        pageChange: function(event){
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
                this.$emit('pageChange', newPage)
            }
        }
    }
})
var WMconponents = {
    /**
    * @描述：投放水印step1；
    */
    step1: {
        template: '#publish-step1',
        data: function(){
            return {
                planName: '',                                                                                             // 计划名称
                startTime: '',                                                                                              // 活动开始时间
                endTime: '',                                                                                               // 活动结束时间
                timeTags: ['3天', '7天', '15天', '30天', '产品到期时间'],
                categories: [],                                                                                           // 类目
                items: [],                                                                                                  // 获取的宝贝
                isActive: 1,                                                                                               // 快速选择活动时间的tag标志
                currentPage: 0,                                                                                       // 当前页
                pageSize: 10,                                                                                          // 每页显示的宝贝个数
                total: 0,                                                                                                   // 一共有多少个宝贝，根据这个数值来算页数
                discountNum: '',                                                                                    // 折扣
                cachePages: [],                                                                                             // 勾选中的宝贝缓存在这里
                approveStatus: 0,
                approve: ['仓库中', '出售中', '橱窗中'],
                title: '',
                isCheckAll: false
            }
        },
        created: function(){
            var vm = this,
                startDate = new Date(),
                endDate = new Date();
                endDate.setDate(startDate.getDate()+7);
            vm.planName = vm.dateFormat(startDate).y + vm.dateFormat(startDate).M + vm.dateFormat(startDate).d + '-' + vm.dateFormat(startDate).h;
            vm.startTime = vm.dateFormat(startDate).date;
            vm.endTime = vm.dateFormat(endDate).date;
            vm.request() .done(function(data){
                vm.items = data.data.items;
                vm.total = data.data.total;
                vm.currentPage += 1;
                vm.approveStatus = data.data.approveStatus;
            })
        },

        computed: {

            // 计算已选的宝贝数
            checkedNum: function(){
                var num = 0;
                this.items.forEach(function(item){
                    if(item.isChecked){
                        num += 1
                    }
                })
                return num;
            },

            // 计算可选的宝贝数
            validItems: function(){
                var num = 0;
                this.items.forEach(function(item){
                    if(item.status === 0){
                        num += 1
                    }
                })
                return num;
            }
        },

        methods: {
            request: function(data){
                var obj = data || {};
                return $.ajax({
                    url: 'http://192.168.1.146:3030/wartermark/publish/step1/items',
                    type: 'POST',
                    dataType: 'json',
                    data: obj
                })
            },

            // 返回上一步
            goNext: function(){
                router.push({
                    path: '/step2'
                })
            },

            // 到下一步
            goPrev: function(){
                window.location.href="http://192.168.1.146:8081/watermark/watermark.html#/"
            },

            // 选择开始时间
            WdateStart: function(){
                var vm = this;
                WdatePicker({
                    dateFmt: 'yyyy-MM-dd HH:mm:ss',
                    maxDate: vm.endTime,
                    onpicked: function(dp){
                        vm.startTime = dp.cal.getDateStr();
                    }
                })

            },

            // 选择结束时间
            WdateEnd: function(){
                var vm = this;
                WdatePicker({
                    dateFmt: 'yyyy-MM-dd HH:mm:ss',
                    minDate: vm.startTime,
                    onpicked: function(dp){
                        vm.endTime = dp.cal.getDateStr();
                    }
                })
            },

            // 快速设置活动时间
            quickSelectTime: function(index){
                var endDate = new Date();
                this.isActive = index;
                switch(index){
                    case 0:
                        endDate.setDate((new Date(this.startTime)).getDate() + 3);
                        break;
                    case 1:
                        endDate.setDate((new Date(this.startTime)).getDate() + 7);
                        break;
                    case 2:
                        endDate.setDate((new Date(this.startTime)).getDate() + 15);
                        break;
                    case 3:
                        endDate.setDate((new Date(this.startTime)).getDate() + 30);
                        break;
                    case 4:
                        endDate = new Date(parseInt(customer.deadline));
                        break;
                }
                this.endTime = this.dateFormat(endDate).date;
            },

            // 勾选
            check: function(index, status){
                if(status === 0){
                    this.items[index].isChecked = !this.items[index].isChecked;
                    this.inspectChecked();
                }
            },

            // 检查是否全选
            inspectChecked: function(){
                var num = 0;
                if(this.validItems === this.checkedNum){
                    this.isCheckAll = true;
                }else{
                    this.isCheckAll = false;
                }
            },

            // 全选
            checkAll: function(){
                if(this.isCheckAll){
                    this.items.forEach(function(item){
                        if(item.status === 0){
                            item.isChecked = false;
                        }
                    })
                }else{
                    this.items.forEach(function(item){
                        if(item.status === 0){
                            item.isChecked = true;
                        }
                    })
                }
                this.isCheckAll = !this.isCheckAll;
            },

            // 格式化日期
            dateFormat: function(date){
                var y = date.getFullYear(),
                    M = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
                    d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
                    h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
                    m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
                    s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
                return {
                    y : y.toString(), 
                    M : M.toString(), 
                    d : d.toString(), 
                    h : h.toString(), 
                    m : m.toString(), 
                    s : s.toString(), 
                    date : y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s
                }
            },

            // 类目查询
            queryCategory: function(){
                
            },

            // 出售中，仓库中、橱窗中的宝贝查询
            queryApprove: function(index){
                var vm = this;
                vm.approveStatus = index;
            },

            //  按宝贝标题、链接、ID查询
            queryTitle: function(){

            },

            // 翻页
            handleCurrentChange: function(val){
                var vm = this;
                vm.currentPage = val;
                postData = {
                    pageNo: vm.currentPage + 1,
                    approveStatus: vm.approveStatus,
                    title: vm.title
                }
                if(vm.checkedNum > 0){
                    vm.cachePages.push(this.cacheItems());
                }
                vm.request(postData).done(function(data){
                    vm.items = data.data.items;
                    vm.checkCache();
                })
            },

            // 批量打折
            setDiscount: function(newVal){
                var vm = this;
                if(isNaN(newVal) || newVal === ''){
                    vm.discountNum = '';
                }else{
                    if(newVal < 0.1){
                        newVal = '0.1'
                    }
                    if(newVal > 10){
                        newVal = '10'
                    }
                    vm.discountNum = newVal.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
                }
                if(vm.discountNum === ''){
                    return
                }
                vm.items.forEach(function(item, index){
                    if(item.status === 0){
                        item.price = parseInt(item.originPrice * (vm.discountNum / 10));
                        console.log(item.price)
                    }
                })
            },

            // 缓存当前页选中的宝贝
            cacheItems: function(){
                var obj = {};
                obj.pagination = this.currentPage;
                obj.items = [];
                obj.indexs = [];
                this.items.forEach(function(item, index){
                    if(item.isChecked){
                        obj.items.push(item);
                        obj.indexs.push(index);
                    }
                })
                return obj;
            },

            // 检查缓存的宝贝
            checkCache: function(){
                var vm = this;
                for(var i = 0; i < vm.cachePages.length; i++){
                    if(vm.cachePages[i].pagination === vm.currentPage){
                        vm.cachePages[i].indexs.forEach(function(item){
                            vm.items[item] = vm.cachePages[i].items[item]
                        })
                        break;
                    }
                }
            }
        },
        directives: {
            fixedbar: {
                inserted: function(el, binding){
                    
                }
            }
        }
    },

    /**
    * @描述：投放水印step2；
    */
    step2: {
        template: '#publish-step2',
        data: function(){
            return {
                currentItem: '',
                items: [],
                isMoving: false,
                total: 100,
                currentPage: 1,
                isActive: 0
            }
        },
        created: function(){
            var vm = this;
            vm.originalItems = [].concat(vm.items);
            $.ajax({
                url: 'http://192.168.1.146:3030/wartermark/publish/step2/items',
                type: 'POST',
                dataType: 'json',
                data: {page: this.currentPage}
            })
            .done(function(data) {
                vm.items = data.data.items;
                vm.currentItem = vm.items[0];
            })
        },
        methods: {
            switchItem: function(index){
                this.currentItem = this.items[index];
                this.isActive = index;
            },
            handleCurrentChange: function(val){
                var vm = this;
                vm.currentPage = val;
                $.ajax({
                    url: 'http://192.168.1.146:3030/wartermark/publish/step2/items',
                    type: 'POST',
                    dataType: 'json',
                    data: {page: this.currentPage}
                })
                .done(function(data) {
                    vm.items = data.data.items;
                    vm.currentItem = vm.items[0];
                })
            },
            reset: function(){
                this.currentItem.wmLeft = 0;
                this.currentItem.wmTop = 0;
            },
            save: function(){
                
            }
        },
        directives: {
            move: {
                inserted: function(el, binding, vnode){
                    var contY, contX, originX, originY, _X, _Y,
                        isDrag = false,
                        vm = vnode.context;
                    $(el).on('mousedown', function(e){
                        originX = e.pageX;
                        originY = e.pageY;
                        positionY = $(el).position().top,
                        positionX = $(el).position().left,
                        _X = originX - contX;
                        _Y = originY - contY;
                        isDrag = true;
                        vm.isMoving = true;
                    })
                    $('body').on('mousemove',  function(e){
                        if (isDrag) {
                            e.stopPropagation();
                            e.preventDefault();
                            var moveX = e.pageX - originX + positionX,
                                moveY = e.pageY - originY + positionY;
                            vnode.context.currentItem.wmLeft = moveX / 3 * 8;
                            vnode.context.currentItem.wmTop = moveY / 3 * 8;
                        }
                    }).on('mouseup', function() {
                        if (isDrag) {

                        }
                        isDrag = false;
                        vm.isMoving = false;
                    });
                }
            }
        },
        computed: {
            currentItemStyle: function(){
                return {
                    left: this.currentItem.wmLeft * (3 / 8) + 'px',
                    top: this.currentItem.wmTop * (3 / 8) + 'px'
                }
            }
        }
    }
}

var router = new VueRouter({
    routes: [
        {
            path: '/step1',
            component: WMconponents.step1
        },
        {
            path: '/step2',
            component: WMconponents.step2
        },
        {
            path: '*',
            component: WMconponents.step1
        }
    ]
})

var wmPublish = new Vue({
    router: router
}).$mount('#wmPublish')
