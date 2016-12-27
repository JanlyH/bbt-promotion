Vue.config.keyCodes = {del: 46};
var WmEditor = new Vue({
    el: '#wmEditor',
    data: {
        showMaps: false,                                                        // 控制显示左侧水印列表
        editorSize: 50,                                                         // 当前画布百分比
        autoWdith: '80px',                                                      
        isShowControls: false,                                                  // 控制显示变换工具
        isShowRegion: false,                                                    // 控制显示框选  
        isShowToolbar: false,                                                   // 控制显示元素工具条
        isEditText: '',                                                         // 是否在编辑文案
        controlsStyle: '',                                                      // 变换工具的样式
        selEditorEl: '',                                                        // 当前选中的元素的index值
        regionStyle: {top: '', left: '', width: '', height: ''},                // 框选的样式
        regionSelIndex: [],                                                     // 框选选中的元素的index值组成的数组
        types: ['全部', '主题', '图形', '角标', '按钮'],
        textFontSize: '',                                                       // 用于观察用户修改文案字体大小
        showCanvasCopy: false,
        maps: [{
                preview: 'https://img.alicdn.com/imgextra/i2/17157061/TB2Gi6ndHaI.eBjSspaXXXIKpXa-17157061.png',
                type: '折扣水印',
                isCollect: false,
                wmID: '0001',
                chunks: [
                    {
                        type: 'img',
                        width: 275,
                        height: 275,
                        top: 100,
                        left: 100,
                        rotate: 0,
                        src: 'https://img.alicdn.com/imgextra/i4/17157061/TB2aGQReByN.eBjSZFkXXb8YFXa-17157061.png'
                    },
                    {
                        type: 'text',
                        width: 220,
                        height: 60,
                        top: 150,
                        left: 130,
                        rotate: 0,
                        fontFamily: 'Microsoft YaHei',
                        fontSize: 48,
                        fontWeight: false,
                        italic: false,
                        color: 'fff',
                        textAlign: 'center',
                        textContent: '双12秒杀'
                    },
                    {
                        type: 'text',
                        width: 50,
                        height: 60,
                        top: 230,
                        left: 130,
                        rotate: 0,
                        fontFamily: 'Microsoft YaHei',
                        fontSize: 48,
                        fontWeight: false,
                        italic: false,
                        color: 'fff',
                        textAlign: 'center',
                        textContent: '￥'
                    },
                    {
                        type: 'text',
                        width: 170,
                        height: 144,
                        top: 230,
                        left: 180,
                        rotate: 0,
                        fontFamily: 'Microsoft YaHei',
                        fontSize: 80,
                        fontWeight: false,
                        italic: false,
                        color: 'fff',
                        textAlign: 'center',
                        textContent: '199'
                    }
                ]
            }],
        editorChunks: [],                                                       // 画布里的元素
        cache: [],                                                              // 存放用户操作记录
        currentCache: 0                                                         // 用户当前的操作记录下标
    },

    mounted: function () {
        var that = this;
        that.$nextTick(function(){
            $(document).keyup(function(e) {
                if (e.keyCode === 46) {
                    if (that.isShowControls) {
                        that.delEditorEl()
                    }
                }
                if (e.ctrlKey === true && e.keyCode === 90) that.undo();
                if (e.ctrlKey === true && e.keyCode === 89) that.redo();
            });
        })
    },

    methods: {

        // 打开贴图
        openMaps: function(){
            this.showMaps = true;
            this.autoWdith = '400px';
            this.$nextTick(function () {
                new IScroll('.maps-container', {
                    mouseWheel: true,
                    scrollbars: true,
                    fadeScrollbars: false,
                    interactiveScrollbars: true,
                    disableMouse: true,
                    scrollbars: 'custom'
                });
            })
        },

        // 关闭贴图
        closeMaps: function(){
            this.showMaps = false;
            this.autoWdith = '80px';
        },

        // 增加画布大小
        addSize: function(){
            this.editorSize += 10;
            this.isShowControls = false;
            this.isShowToolbar = false;
        },

        // 减少画布大小
        reduceSize: function(){
            this.editorSize -= 10;
            this.isShowControls = false;
            this.isShowToolbar = false;
        },

        // 添加水印到画布
        addEditorEl: function(index){
            var that = this;
            that.maps[index].chunks.forEach(function(item){
                var chunk = JSON.stringify(item);
                that.editorChunks.push(JSON.parse(chunk));
            })
            var obj = JSON.stringify(this.editorChunks)
            this.cache.push(JSON.parse(obj));
        },

        // 添加文字到画布
        addTextContent: function(){
            var textObj = {
                
            }
        },

        // 删除编辑器里的元素
        delEditorEl: function(e){
            var that = this;
            if (that.regionSelIndex.length > 1) {
                function sortNumber(a,b){
                    return a - b
                }
                var arr = that.regionSelIndex.sort(sortNumber);
                arr.forEach(function(item, index){
                    that.editorChunks.splice((item-index), 1);
                })
                that.regionSelIndex = [];
            }else{
                that.editorChunks.splice(that.selEditorEl, 1);
            }
            that.isShowControls = false;
            that.isShowToolbar = false;
            this.pushCache();
        },

        // 当点击画布里的水印素材时显示变换控件
        showControls: function(index){
            this.selEditorEl = index;
            this.isShowControls = false;
            (this.isEditText !== index) && (this.isEditText = 99999);
            this.$nextTick(function(){
                $('.colpick').hide()
            })
            this.isShowControls = true;
            this.isShowToolbar = true;
            this.textFontSize = this.editorChunks[this.selEditorEl].fontSize;
            this.$nextTick(function(){
                $('.transform-controls').focus();
            })
        },

        // 自动选中文本
        selectText: function(){
            var that = this;
            el = that.editorChunks[that.selEditorEl];
            if (el.type === 'text') {
                var obj = document.querySelectorAll('.editor-el')[that.selEditorEl];
                that.isEditText = that.selEditorEl;
                that.$nextTick(function(){
                    if (document.body.createTextRange) {
                        range = document.body.createTextRange();
                        range.moveToElementText(obj);
                        range.select();
                    } else if (window.getSelection) {
                        selection = window.getSelection();
                        range = document.createRange();
                        range.selectNodeContents(obj);
                        selection.removeAllRanges();
                        selection.addRange(range);
                    };
                })
            }
        },

        //编辑文本
        editText: _.debounce(function(e){
            var target = e.target,
                el = this.editorChunks[this.selEditorEl];
            el.textContent = target.textContent;
            this.pushCache();
        }, 300),

        // 打开颜色选择器
        openColpick: function(e){
            var that = this, convasTop, convasLeft, oldColor;
                $el = $(e.target);
            $el.colpick({
                colorScheme:'light',
                layout:'hex',
                color: that.editorChunks[that.selEditorEl].color || 'ffffff',
                onChange: function(hsb,myHex,rgb,el) {
                    that.editorChunks[that.selEditorEl].color = myHex;
                },
                onBeforeShow: function(el){
                    convasTop = $('.editor-canvas').offset().top;
                    convasLeft = $('.editor-canvas').offset().left;
                },
                onShow: function(el){
                    var top = that.controlsStyle.top - 53 - $(el).height() + convasTop,
                        left = that.controlsStyle.left + convasLeft;
                    $(el).css({top: top + 'px', left: left + 'px'})
                    oldColor = that.editorChunks[that.selEditorEl].color;
                },
                onHide: function(el){
                    if (!that.isShowToolbar) {
                        $(el).remove();
                    }
                    if (that.editorChunks[that.selEditorEl].color != oldColor) {
                        that.pushCache()
                    }
                },
                submit: false
            })
        },

        // 文字对齐
        textAlign: function(align){
            this.editorChunks[this.selEditorEl].textAlign = align;
            this.pushCache()
        },

        // 文字加粗
        textFontWeight: function(){
            this.editorChunks[this.selEditorEl].fontWeight = !this.editorChunks[this.selEditorEl].fontWeight;
            this.pushCache()
        },

        // 置顶或置底
        changeIndex: function(type){
            var list = this.editorChunks;
            if (type == 'down') {
                list.unshift(list[this.selEditorEl]);
                list.splice(this.selEditorEl + 1, 1);
                this.selEditorEl = 0;
            }
            if (type == 'top') {
                list.push(list[this.selEditorEl]);
                list.splice(this.selEditorEl, 1);
                this.selEditorEl = list.length - 1;
            }
            this.pushCache()
        },

        // 存操作记录
        pushCache: function(){
            if (this.currentCache < this.cache.length - 1) {
                this.cache = this.cache.slice(0, this.currentCache + 1);
                // _.dropRight(this.cache,  this.cache.length - this.currentCache - 1)
            }
            var obj = JSON.stringify(this.editorChunks)
            this.cache.push(JSON.parse(obj));
            this.currentCache += 1;
        },

        // 撤销
        undo: function(){
            if (this.currentCache > 0) {
                var obj = JSON.stringify(this.cache[this.currentCache - 1]);
                this.editorChunks = JSON.parse(obj);
                this.currentCache -= 1;
                this.isShowControls = false;
                this.isShowToolbar = false;
            }
        },

        // 重做
        redo: function(){
            if (this.currentCache < this.cache.length - 1) {
                var obj = JSON.stringify(this.cache[this.currentCache + 1]);
                this.editorChunks = JSON.parse(obj);
                this.currentCache += 1;
                this.isShowControls = false;
                this.isShowToolbar = false;
            }
        }
    },

    watch: {
        textFontSize: function(newVal, oldVal){
            this.editorChunks[this.selEditorEl].fontSize = parseInt(newVal);
        }
    },

    computed: {

        // 画布大小
        editorStyle: function(){
            var size = this.editorSize / 100 * 800 + 'px';
            return size;
        },

        // 居中画布
        wrapAlignCenter: function(){
            var winH = $(window).height(),
                pt = (winH - 70 - this.editorSize / 100 * 800) / 2 + 'px';

            return {
                paddingTop: pt,
                height: winH - 70 + 'px'
            }
        },

        // 变换工具的tips文案
        transformTips : function(){
            return {
                width: Math.round(this.controlsStyle.width),
                height: Math.round(this.controlsStyle.height),
                rotate: Math.round(this.controlsStyle.rotate),
                left: Math.round(this.controlsStyle.left),
                top: Math.round(this.controlsStyle.top)
            }
        },

        // 计算工具条的样式
        toolbarStyle: function(){
            var top, left;
            return {
                top: this.controlsStyle.top - 43 + 'px',
                left: this.controlsStyle.left + 'px'
            }
        },

        // 计算变换工具的样式
        controlsStyle: function(){
            var that = this;
            if (that.regionSelIndex.length > 1) {
                var tops = [], lefts = [], rights = [], bottoms = [], scale = that.editorSize / 100;
                that.regionSelIndex.forEach(function(item, index){
                    tops.push(that.editorChunks[item].top);
                    rights.push(that.editorChunks[item].width + that.editorChunks[item].left);
                    bottoms.push(that.editorChunks[item].height + that.editorChunks[item].top);
                    lefts.push(that.editorChunks[item].left);
                })
                return {
                    width: (Math.max.apply(null, rights) - Math.min.apply(null, lefts)) * scale,
                    height: (Math.max.apply(null, bottoms) - Math.min.apply(null, tops)) * scale,
                    top: Math.min.apply(null, tops) * scale,
                    left: Math.min.apply(null, lefts) * scale,
                    rotate: 0
                }
            }else if (that.editorChunks[that.selEditorEl]){
                return {
                    width: that.editorSize / 100 * that.editorChunks[that.selEditorEl].width,
                    height: that.editorSize / 100 * that.editorChunks[that.selEditorEl].height,
                    top: that.editorSize / 100 * that.editorChunks[that.selEditorEl].top,
                    left: that.editorSize / 100 * that.editorChunks[that.selEditorEl].left,
                    rotate: that.editorChunks[that.selEditorEl].rotate
                }
            }
        }
    },
    directives: {

        // 鼠标拖动
        move: {
            inserted: function(el, binding){
                var falg = false,
                    that = this, elX, elY, convasX, convasY, left, top, originX, originY, elOriginX, elOriginY, isPushCache = false;
                $(el).mousedown(function(e){
                    e.stopPropagation();
                    if (!$(el).hasClass('editing')) {
                        falg = true;
                        convasX = $('.editor-layout').offset().left;
                        convasY = $('.editor-layout').offset().top;
                        originX = e.pageX;
                        originY = e.pageY;
                        // 获取鼠标到元素的顶部和左部的距离
                        elX = e.pageX - $(el).offset().left,
                        elY = e.pageY - $(el).offset().top;
                        elOriginX = [];
                        elOriginY = [];
                        if (binding.value.region) {
                            WmEditor.regionSelIndex.forEach(function(item){
                                elOriginY.push($('.editor-el').eq(item).offset().top - $(el).offset().top);
                                elOriginX.push($('.editor-el').eq(item).offset().left - $(el).offset().left);
                            })
                        }
                    }
                })
                $('body').on('mousemove', _.throttle(function(e) {
                    if (falg) {
                        $('.colpick').hide();
                        $('.editor-toolbar-wrap').hide();
                        isPushCache = true;
                        // debugger
                        left = e.pageX - elX - convasX;
                        top = e.pageY - elY - convasY
                        $(el).css({
                            left: left + 'px',
                            top: top + 'px'
                        });
                        if (binding.modifiers.transform) {
                            if (binding.value.region) {
                                WmEditor.regionSelIndex.forEach(function(item, index){
                                    WmEditor.editorChunks[item].top = (top  + elOriginY[index]) / (WmEditor.editorSize / 100);
                                    WmEditor.editorChunks[item].left = (left + elOriginX[index]) / (WmEditor.editorSize / 100);
                                })
                            }else{
                                WmEditor.editorChunks[WmEditor.selEditorEl].top = top / (WmEditor.editorSize / 100);
                                WmEditor.editorChunks[WmEditor.selEditorEl].left = left / (WmEditor.editorSize / 100);
                            }
                        }
                        if (binding.modifiers.el) {
                            WmEditor.editorChunks[binding.value.index].top = top / (WmEditor.editorSize / 100);
                            WmEditor.editorChunks[binding.value.index].left = left / (WmEditor.editorSize / 100);
                        }
                    }
                }, 10)).mouseup(function() {
                    if (isPushCache) { WmEditor.pushCache()};
                    falg = false;
                    isPushCache = false;
                    $('.editor-toolbar-wrap').show();
                });
            }
        },

        // 变换控件缩放
        transform: {
            inserted: function(el, binding){
                var parent = el.parentNode,
                    parentRect = parent.getBoundingClientRect(),
                    scale = WmEditor.editorSize / 100,
                    currentEl,
                    isScale = false, parentX, parentY, pointerX, pointerY, parentH, parentW, convasX, convasY, originX, originY;
                $(el).on('mousedown', function(e){
                    e.stopPropagation();
                    isScale = true;
                    pointerX = e.pageX;
                    pointerY = e.pageY;
                    parentX = parentRect.left + $(window).scrollLeft();
                    parentY = parentRect.top + $(window).scrollTop();
                    parentW = parentRect.width;
                    parentH = parentRect.height;
                    WHscale = $(parent).width() / $(parent).height();
                    convasX = $('.editor-layout').offset().left;
                    convasY = $('.editor-layout').offset().top;
                    currentEl = WmEditor.editorChunks[WmEditor.selEditorEl];
                    originX = parentX + (parentW / 2);
                    originY = parentY + (parentH / 2);
                })
                $('body').on('mousemove', _.throttle(function(e) {
                    if (isScale) {
                        var moveY = pointerY - e.pageY,
                            moveX = pointerX - e.pageX;

                        // 拖动左上角缩放
                        if(binding.modifiers.lt){
                            if (parentH + moveY > 0) {
                                currentEl.top = (parentY - convasY - moveY) / scale;
                                currentEl.left = (parentX - convasX - moveY) / scale;
                            }
                            currentEl.width = Math.abs(parentW + moveY) / scale;
                            currentEl.height = Math.abs(parentH + moveY) / scale;
                        };

                        // 拖动上中点缩放
                        if (binding.modifiers.mt) {
                            if (parentH + moveY > 0) {
                                currentEl.top = (parentY - convasY - moveY) / scale;
                            }
                            currentEl.height = Math.abs(parentH + moveY) / scale;
                        };

                        // 拖动右上角缩放
                        if (binding.modifiers.rt) {
                            if (parentH + moveY > 0) {
                                currentEl.top = (parentY - convasY - moveY) / scale;
                            }else{
                                currentEl.left = (parentX - convasX + moveY + parentW) / scale;
                            }
                            currentEl.width = Math.abs(moveY + parentW) / scale;
                            currentEl.height = Math.abs(moveY + parentH) / scale;
                        };

                        // 拖动左中点缩放
                        if (binding.modifiers.lm) {
                            if (parentW + moveX > 0) {
                                currentEl.left = (parentX - convasX - moveX) / scale;
                            }
                            currentEl.width = Math.abs(parentW + moveX) / scale;
                        };

                        // 拖动又中点缩放
                        if (binding.modifiers.rm) {
                            moveX = e.pageX - pointerX;
                            if (parentW + moveX < 0) {
                                currentEl.left = (parentX - convasX + parentW + moveX) / scale;
                            }
                            currentEl.width = Math.abs(parentW + moveX) / scale;
                        };

                        // 拖动左下角缩放
                        if (binding.modifiers.lb) {
                            if (parentH - moveY > 0) {
                                currentEl.left = (parentX - convasX + moveY) / scale;
                            }else{
                                currentEl.top = (parentY - convasY - moveY + parentH) / scale;
                            }
                            currentEl.width = Math.abs(parentW - moveY) / scale;
                            currentEl.height = Math.abs(parentH - moveY) / scale;
                        };

                        // 拖动中下点缩放
                        if (binding.modifiers.mb) {
                            if (parentH - moveY > 0) {
                                currentEl.height = Math.abs(parentH - moveY) / scale;
                            }else{
                                currentEl.top = (parentY - convasY - moveY + parentH) / scale;
                                currentEl.height = Math.abs(moveY - parentH) / scale;
                            }
                        };

                        // 拖动右下角缩放
                        if (binding.modifiers.rb) {
                            if (parentH - moveY > 0) {
                                currentEl.height = Math.abs(parentH - moveY) / scale;
                                currentEl.width = Math.abs(parentW - moveY) / scale;
                            }else{
                                currentEl.top = (parentY - convasY - moveY + parentH) / scale;
                                currentEl.left = (parentX - convasX - moveY + parentH) / scale;
                                currentEl.height = Math.abs(moveY - parentH) / scale;
                                currentEl.width = Math.abs(moveY - parentW) / scale;
                            }
                        }

                        // 拖动旋转
                        if (binding.modifiers.rotate) {
                            var _x = Math.abs(e.pageX - originX),
                                _y = Math.abs(e.pageY - originY),
                                _z = Math.sqrt( _x * _x + _y * _y ),
                                rotate = Math.round(( Math.asin( _y / _z ) / Math.PI * 180 ));
                                // console.log('rotate =' + rotate);
                            // 第一象限
                            if (originX <= e.pageX && originY >= e.pageY) {
                                rotate = 270 - rotate;
                                // console.log('第一象限：' + rotate)
                            }

                            // 第二象限
                            else if(originX >= e.pageX && originY >= e.pageY){
                                rotate = 90 + rotate;
                                 // console.log('第二象限：' + rotate)
                            }

                            // 第三象限
                            else if(originX >= e.pageX && originY <= e.pageY){
                                rotate = 90 - rotate ;
                                // console.log('第三象限：' + rotate)
                            }

                            // 第四象限
                            else if(originX <= e.pageX && originY <= e.pageY){
                                rotate = 270 + rotate;
                                // console.log('第四象限：' + rotate)
                            }
                            currentEl.rotate = rotate;
                            WmEditor.isShowToolbar = false;
                        }
                    }
                }, 20)).mouseup(function() {
                    if (isScale) {WmEditor.pushCache(); WmEditor.isShowToolbar = true};
                    isScale = false;
                });
            }
        },

        // 框选功能
        region: {
            inserted: function(el, binding){
                var falg = false, originX, originY, canvasX, canvasY;
                $(el).mousedown(function(e){
                    if (e.target.className.indexOf('editor-layout') != -1 || e.target.className.indexOf('editor-wrap') != -1 || e.target.className.indexOf('editor-canvas') != -1) {
                        // e.stopPropagation();
                        WmEditor.isShowControls = false;
                        WmEditor.isShowToolbar = false;
                        WmEditor.isEditText = 99999;
                        falg = true;
                        originX = e.pageX;
                        originY = e.pageY;
                        canvasX = $('.editor-layout').offset().left;
                        canvasY = $('.editor-layout').offset().top;
                        WmEditor.regionStyle = {};
                        WmEditor.regionSelIndex = [];
                        $('.editor-el').removeClass('sel');
                    }
                })
                $('body').on('mousemove', _.throttle(function(e){
                    if (falg && (Math.abs(e.pageX - originX) > 0 || Math.abs(e.pageY - originY) > 0)) {
                        WmEditor.isShowRegion = true;
                        var regionTop = Math.min(e.pageY, originY),
                            regionLeft = Math.min(e.pageX, originX),
                            regionWidth = Math.abs(e.pageX - originX),
                            regionHeight = Math.abs(e.pageY - originY);
                        WmEditor.regionStyle = {
                            top: regionTop + 'px',
                            left: regionLeft + 'px',
                            width: regionWidth + 'px',
                            height: regionHeight + 'px'
                        }

                        // 遍历判断元素是否在框选里是就加上.sel, 不是就移除.sel;
                        WmEditor.editorChunks.forEach(function(item, index){
                            var $el = $('.editor-el'),
                                $region = $('.region'),
                                selLeft = $el.eq(index).offset().left,
                                selTop = $el.eq(index).offset().top,
                                selWidth = $el.eq(index).width(),
                                selHeight = $el.eq(index).height(),

                                top = Math.max(selTop, regionTop),
                                right = Math.min((regionLeft + regionWidth), (selLeft + selWidth)),
                                bottom = Math.min((regionTop + regionHeight), (selTop + selHeight)),
                                left = Math.max(regionLeft, selLeft);

                            if (bottom > top && right > left) {
                                $el.eq(index).addClass('sel');

                                // 判断regionSelIndex数组里有没index这个数，如果有就跳过，没有就push
                                if (WmEditor.regionSelIndex.indexOf(index) == -1) {
                                    WmEditor.regionSelIndex.push(index);
                                }
                            }else{
                                $el.eq(index).removeClass('sel');

                                // 删除regionSelIndex数组里的index
                                var elIndex = WmEditor.regionSelIndex.indexOf(index)
                                elIndex > -1 && WmEditor.regionSelIndex.splice(elIndex, 1);
                            }
                        })
                    }
                }, 20)).mouseup(function() {
                    falg = false;
                    WmEditor.isShowRegion = false;
                    if (WmEditor.regionSelIndex.length > 0) {
                        if (WmEditor.regionSelIndex.length == 1) {
                            WmEditor.selEditorEl = WmEditor.regionSelIndex[0];
                        }
                        WmEditor.isShowControls = true;
                    }
                    WmEditor.$nextTick(function(){
                        $('.transform-controls').focus();
                    })
                });
            }
        },

        // 鼠标滚轮滑动时增减字体大小
        mousewheel: {
            inserted: function(el){
                $(el).on("mousewheel DOMMouseScroll", function (e) {
                    var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
                                (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
                    if (delta > 0) {
                        // 向上滚
                        WmEditor.textFontSize = WmEditor.textFontSize * 1 + 1;
                    } else if (delta < 0) {
                        // 向下滚
                        WmEditor.textFontSize = WmEditor.textFontSize * 1 - 1;
                    }
                });
            }
        },

        // 字体大小、文案改变存记录，
        pushcache: {
            inserted: function(el){
                var oldVal, newVal;
                $(el).focus(function(){
                    var text = $(this).val() || $(this).text();
                    oldVal = text;
                }).blur(function(){
                    var text = $(this).val() || $(this).text();
                    newVal = text;
                    if (oldVal !== newVal) {
                        WmEditor.pushCache()
                    }
                })
            }
        }
    }
})