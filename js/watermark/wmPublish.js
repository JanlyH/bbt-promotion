var WMconponents = {
    /**
    * @描述：投放水印step1； 
    */
    step1: {
        template: '#publish-step1',
        data: function(){
            return {

            }
        },
        methods: {
            goNext: function(){
                router.push({
                    path: '/step2'
                })
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
                items: [
                    {
                        itemImg: 'https://asearch.alicdn.com/bao/uploaded/i3/106580341263342056/TB2D6.AaxXlpuFjSsphXXbJOXXa_!!0-saturn_solar.jpg',
                        wmImg: 'https://proxy.huanleguang.com/?url=http://hlg_material.img-cn-hangzhou-internal.aliyuncs.com/20160923/3215139_170550_2925.png@310h_310w.png',
                        wmTop: 0,
                        wmLeft: 0
                    },
                    {
                        itemImg: 'https://img.alicdn.com/bao/uploaded/i4/TB1kmdiLXXXXXXVaFXXXXXXXXXX_!!0-item_pic.jpg',
                        wmImg: 'https://proxy.huanleguang.com/?url=http://hlg_material.img-cn-hangzhou-internal.aliyuncs.com/20160923/3215139_170550_2925.png@310h_310w.png',
                        wmTop: 0,
                        wmLeft: 0
                    },
                    {
                        itemImg: 'https://img.alicdn.com/bao/uploaded/i3/TB174AfLXXXXXX2XFXXXXXXXXXX_!!0-item_pic.jpg',
                        wmImg: 'https://proxy.huanleguang.com/?url=http://hlg_material.img-cn-hangzhou-internal.aliyuncs.com/20160923/3215139_170550_2925.png@310h_310w.png',
                        wmTop: 0,
                        wmLeft: 0
                    },
                    {
                        itemImg: 'https://img.alicdn.com/bao/uploaded/i4/TB1J9l1LpXXXXccXpXXXXXXXXXX_!!0-item_pic.jpg',
                        wmImg: 'https://proxy.huanleguang.com/?url=http://hlg_material.img-cn-hangzhou-internal.aliyuncs.com/20160923/3215139_170550_2925.png@310h_310w.png',
                        wmTop: 0,
                        wmLeft: 0
                    },
                    {
                        itemImg: 'https://img-tmdetail.alicdn.com/bao/uploaded///img.alicdn.com/bao/uploaded/TB1vGJVNpXXXXafXpXXXXXXXXXX_!!0-item_pic.jpg',
                        wmImg: 'https://proxy.huanleguang.com/?url=http://hlg_material.img-cn-hangzhou-internal.aliyuncs.com/20160923/3215139_170550_2925.png@310h_310w.png',
                        wmTop: 0,
                        wmLeft: 0
                    }
                ],
                isMoving: false
            }
        },
        created: function(){
            this.currentItem = this.items[0];
        },
        directives: {
            move: {
                inserted: function(el, binding, vnode){
                    var contY, contX, originX, originY, _X, _Y,
                        isDrag = false,
                        that = this;
                    $(el).on('mousedown', function(e){
                        originX = e.pageX;
                        originY = e.pageY;
                        contY = $(el).offset().top,
                        contX = $(el).offset().left,
                        _X = originX - contX;
                        _Y = originY - contY;
                        isDrag = true;
                    }).on('mousemove', function(e){
                        if (isDrag) {
                            e.stopPropagation();
                            e.preventDefault();
                            var moveX = e.pageX - contX - _X,
                                moveY = e.pageY - contY - _Y;
                            vnode.context.currentItem.wmLeft = moveX / 3 * 8;
                            vnode.context.currentItem.wmTop = moveY / 3 * 8;
                            console.log(1)
                        }
                    });
                    $('body').mouseup(function() {
                        if (isDrag) {

                        }
                        isDrag = false;
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
    },

    /**
    * @描述：投放水印step3； 
    */
    step3: {
        template: '#publish-step3'
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
            path: '/step3',
            component: WMconponents.step3
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