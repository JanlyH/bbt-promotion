var WMconponents = {
    /**
    * @描述：已投放水印图标组件； 
    */
    step1: {
        template: '#publish-step1'
    },

    /**
    * @描述：可投放水印图标组件； 
    */
    step2: {
        template: '#publish-step2'
    },

    /**
    * @描述：已投放的宝贝组件； 
    */
    step3: {
        template: '#publish-step3'
    }
}


var Watermark = new Vue({
    el: '#wmPublish',
    data: {
        currentView: WMconponents.step1,
        isActive: 0
    },
    methods: {
        changeTab: function(index){
            this.isActive = index;
            switch(index){
                case 0:
                    this.currentView = WMconponents.step1;
                    break;
                case 1:
                    this.currentView = WMconponents.step2;
                    break;
                case 2:
                    this.currentView = WMconponents.step3;
                    break;
            }
        }
    }
})