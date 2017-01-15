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
                this.$emit('pageChange', newPage)
            }
        }
    }
})
var Watermark = new Vue({
    el: '#activityDetaile',
    data: {
        tabs: ['投放成功', '投放失败', '正在投放'],
        currentTab: 0
    },
    computed: {
        selectedNum: function() {
            return 0;
        }
    },
    methods: {
        goPrev: function() {

        },
        goNext: function() {

        }
    }
})