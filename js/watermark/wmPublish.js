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
                planName: '',
                startTime: '',
                endTime: '',
                timeTags: ['3天', '7天', '15天', '30天', '产品到期时间'],
                categories: [],
                items: [],
                isActive: 1,
                currentPage: 0,
                pageSize: 10,
                total: 0
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
            $.ajax({
                url: 'http://192.168.1.146:3030/wartermark/publish/step1/items',
                type: 'POST',
                dataType: 'json',
                data: {

                }
            })
            .done(function(data){
                vm.items = data.data.items;
                vm.total = data.data.total;
                vm.currentPage += 1;
            })
        },
        methods: {
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
            check: function(){

            },
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
            queryCategory: function(){
                
            },
            handleCurrentChange: function(val){
                var vm = this;
                vm.currentPage = val;
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
