// 判断是否为ie8，如果是给提示用高版本的浏览器；
(function(){
	if (IsIE8()) {
		var tipsContent = '您现在的浏览器版本过低，为了不影响您的体验建议升级<a class="btn-link" target="_blank" href="http://rj.baidu.com/soft/detail/14917.html?ald">更高版本的ie</a>，'+
						  '或者使用<a class="btn-link" target="_blank" href="http://rj.baidu.com/soft/detail/14744.html?ald">chrome浏览器</a>'
		var tipsDom = $('<div></div>').css({
			position: 'fixed',
			width: '100%',
			top: 0,
			left: 0,
			padding: '10px 20px',
			backgroundColor: '#fff2df',
			color: '#f50',
			textAlign: 'center',
			border: '1px solid #f50',
			zIndex: '24'
		}).html(tipsContent).append('<a href="javascript:;" class="closeTips fr" style="font-size: 16px; color: #f50;">×</a>');
		$('body').append(tipsDom);

		$('.closeTips').click(function() {
			$(this).parent().remove();
		});
		console.log(1)
	}
}());

var EditMobileDetailes = (function(){
	var $body = $('body'),
		isDrag = false,
		isCount = false;

	// 创建模块
	function createDom(el){
		var	_len = $('.custom-module').length,
		 	dom = '<div class="custom-module" data-index="'+ _len +'">'
				  +'<div class="module-content"><div class="module-default">请点击编辑模块</div></div><div class="moudule-ctrl"><ul class="ctrl-items">'
				  +'<li class="ctrl-exchange up"><i class="custom-mobile-icon">&#xe646;</i></li>'
				  +'<li class="ctrl-exchange down"><i class="custom-mobile-icon">&#xe647;</i></li>'
				  +'<li class="ctrl-add"><i class="custom-mobile-icon">&#xe627;</i></li>'
				  +'<li class="ctrl-del"><i class="custom-mobile-icon">&#xe614;</i></li></ul></div></div>';
		$(el).after(dom);
	};

	//重置dom
	function resetDom(){
		// $body.off('mouseup');
		$('.custom-module').removeClass('drag stay').attr('style', '');
		isDrag = false;
	}

	// 创建提示模块
	function createTipsDom(){
		var dom = '<div class="tips-content">释放鼠标将模块添加到此处</div>'
		return dom;
	};

	// 重新赋模块的data-index值;
	function index(){
		$('.custom-module').removeAttr('data-index');
		var	_len = $('.custom-module').length;
		for (var i = 0; i < _len; i++) {
			$('.custom-module').eq(i).attr('data-index', i);
		}
	}

	// 选中模块
	$body.on('click', '.custom-module', function(e) {
		resetDom()
		e.stopPropagation();
		$(this).addClass('edit').siblings().removeClass('edit');
		if (!!$(this).find('imgContainer')) {
			var imgUrl = $(this).find('img').attr('src');
			$('.module-edit-container').find('.imgUrl').val(imgUrl).focus();
		}
	});

	// 增加模块
	$body.on('click', '.ctrl-add', function(e) {
		resetDom();
		e.stopPropagation();
		var thisModule = $(this).parents('.custom-module');
		createDom(thisModule);

		// 删除模块后重新计算data-index值;
		index();
	});

	// 删除模块
	$body.on('click', '.ctrl-del', function(e) {
		resetDom();
		e.stopPropagation();
		var thisModule = $(this).parents('.custom-module'),
			$module = $('.custom-mobile-detailes').find('.custom-module'),
			len = $module.size();
			content = thisModule.find('.module-content')
		if (len === 1) {
			if (content.length > 0) {
				content.remove();
				thisModule.append('<div class="module-default">请点击编辑模块</div>');
			}
			return false;
		}else{
			thisModule.remove();
		}

		// 删除模块后重新计算data-index值;
		index();
	});


	// 交换位置
	function exchange(current, target){
		var	thisHtml = $(current).html(),
			targetHtml = $(target).html();
		$(current).html(targetHtml);
		$(target).html(thisHtml);

		// 当前的编辑状态也互换
		if ($(current).hasClass('edit')) {
			$(current).removeClass('edit');
			$(target).addClass('edit');
		}else if ($(target).hasClass('edit')) {
			$(target).removeClass('edit');
			$(current).addClass('edit');
		}
		$(current).attr('style', '');
	}

	// 模块之间的位置交换
	$body.on('click', '.ctrl-exchange', function(e) {
		$('.custom-module').removeClass('drag stay');
		e.stopPropagation();
		var that = this,
			$current = $(that).parents('.custom-module'),
			parentIndex = $current.data('index'),
			_len = $('.custom-module').length;
		if ($(that).hasClass('up')) {
			if (parentIndex > 0) {
				var $target = $('.custom-module[data-index="'+ ( parentIndex - 1 ) +'"]');
			}else{
				return false;
			}
		}else if ($(that).hasClass('down')) {
			if (parentIndex < _len-1) {
				var $target = $('.custom-module[data-index="'+ ( parentIndex + 1 ) +'"]');
			}else{
				return false;
			}
		}
		exchange($current, $target);
		// isDrag = false;
	});

	// 模块拖动交换位置
	var Y, containerTop, targetTop, targetLeft, startTime, endTime, stayLen, $stayItem, itemTops = [];
	$body.on('mousedown', '.custom-module', function(e) {
		Y = e.pageY;
		startTime = new Date()*1;
		e.stopPropagation();
		$('.custom-module').removeClass('drag stay');
		$(this).addClass('drag').siblings('.custom-module').addClass('stay');
		containerTop = $('.custom-mobile-detailes').offset().top;
		$target = $('.custom-module.drag');
		targetTop = Y - $target.offset().top;
		$stayItem = $('.custom-module.stay');
		stayLen = $stayItem.length;
		isCount = true;
		isDrag = true;
	});
	$body.mousemove(function(e){
		if (isDrag) {
			var _y = e.pageY,
				moveY = _y - targetTop - containerTop,
				isRemoveTips = true;
			$('.custom-module.drag').css({
				position: 'absolute',
				left: 0,
				top: moveY,
				zIndex: 24,
				opacity: 0.6,
				filter: 'alpha(opacity="60")'
			});
			if (isCount) {
				itemTops = []; 
				for (var i = 0; i < stayLen; i++) {
					var itemTop = $stayItem.eq(i).offset().top + $stayItem.eq(i).innerHeight()/2;
					itemTops.push(itemTop);
				}
				isCount = false;
			}else{
				for (var i = 0; i < stayLen; i++) {
					if (_y < itemTops[i] && i === 0) {
						$('.tips-content').remove();
						if ($('.tips-content').length < 1) {
							$stayItem.eq(0).before(createTipsDom());
						}
					}else if (_y >= itemTops[i] && i === stayLen - 1) {
						$('.tips-content').remove();
						if ($('.tips-content').length < 1) {
							$stayItem.eq(stayLen - 1).after(createTipsDom());
						}
					}else if(_y >= itemTops[i] && _y < itemTops[i+1]){
						$('.tips-content').remove();
						if ($('.tips-content').length < 1) {
							$stayItem.eq(i).after(createTipsDom());
						}
					}
				}
			}
			
		}
	}).on('mouseup', function(e){
		e.preventDefault();
		isDrag = false;
		endTime = new Date()*1;
		$('.custom-module.drag').siblings('.custom-module').removeClass('stay');
		var $stayInsert = $('.tips-content').prev();
		if ($stayInsert.length > 0) {
			$('.tips-content').remove();
			var $insertDom = $('<div>').addClass('custom-module').html($('.custom-module.drag').html());
			$stayInsert.after($insertDom);
			$('.custom-module.drag').remove();
		}else{
			$('.custom-module.drag').removeClass('drag').attr('style', '').siblings('.custom-module').removeClass('stay');
		}
		index();
		
		isCount = false;
	})

	/*// 模块配置内容快隐藏
	function moduleEditOut(cb){
		$('.module-edit-container').removeClass('in').animate({right: '-280px'}, 300, function(){cb()});
	}*/

	// 绑定配置内容块cancel事件
	$('.module-edit-container').find('.cancel').click(function() {
		$('.custom-module.edit').removeClass('edit');
	});

	// 绑定插入图片事件
	$('.module-edit-container').find('.insetImg').click(function() {
		var imgUrl = $('.imgUrl').val(),
			$content = $('.custom-module.edit').find('.module-content');
		if (imgUrl.length > 0) {
			if ($content.find('.imgContainer').length > 0) {
				$content.find('.imgContainer').find('img').attr('src', imgUrl)
			}else{
				$content.html('');
				$content.append($('<div class="imgContainer"><img src="'+ imgUrl +'"></div>'));
			}
			$('.custom-module.edit').find('.module-default').remove();
		}
	});

	// 绑定插入代码事件
	$('.module-edit-container').find('.insetCode').click(function() {
		var code = editor.getData(),
			$content = $('.custom-module.edit').find('.module-content');
		if (code.length > 0) {
			if ($content.find('.codeContainer').length > 0) {
				$content.find('.codeContainer').html(code);
			}else{
				$content.html('');
				$content.append($('<div class="codeContainer"></div>'));
				$content.find('.codeContainer').html(code);
			}
			$('.custom-module.edit').find('.module-default').remove();
		}
	});
}());

var loadItem = (function(){
	var $target = $('#items-container'),
		itemsH = $target.offset().top;

	// 定好容器的高度
	$('#items-container').css({
		height: $(window).height() - itemsH - 10 + 'px'
	});

	// 当浏览器高度变化时跟新容器高度和插件
	$(window).resize(function(){
		$('#items-container').css({
			height: $(window).height() - itemsH - 10 + 'px'
		})
		$('#items-container').perfectScrollbar('update');
	})

	// 构建滚动加载函数
	var ScrollLoad = function(){};
	ScrollLoad.prototype.init = function(opts){
		var opts = this.opts = opts,
			that = this;
		$.ajax({
			url: opts.url,
			type: 'GET',
			dataType: 'json'
		})
		.success(function(data) {
			that.dataLength = data.data.length;
			that.renderData(data, opts.initNum);
			$target.on('ps-y-reach-end', function(){
				that.renderData(data, opts.loadNum);
				that.delayLoadImg();
			})
			// 调用自定义滚动条插件
			$target.perfectScrollbar();

			// 调用图片延时加载插件
			that.delayLoadImg();
		});
	}

	// 渲染dom
	ScrollLoad.prototype.renderDom = function(){
		var li = $('<li></li>'),
			img = $('<div class="item-pic"></div>').append('<img data-pic="" src="https://img.alicdn.com/imgextra/i2/17157061/TB2csxclXXXXXaHXpXXXXXXXXXX-17157061.png">'),
			title = $('<h5 class="item-title"></h5>');
		li = li.append(img).append(title);
		$target.find('.items-list').append(li);
	}

	// 渲染数据
	ScrollLoad.prototype.renderData = function(data, num){
		var dataLength = this.dataLength,
			itemsNum = $target.find('.items-list li').length;
		for (var i = 0; i < num; i++) {
			itemsNum = $target.find('.items-list li').length;
			if (itemsNum >= dataLength) {
				break;
			}
			this.renderDom();
			var pic = data.data[itemsNum]['pic'],
				title = data.data[itemsNum]['title'],
				$li = $target.find('.items-list').find('li').eq(itemsNum);
			$li.find('img').attr('data-pic', pic);
			$li.find('.item-title').text(title);
		}
	}

	// 延时加载图片
	ScrollLoad.prototype.delayLoadImg = function(){
		$target.find('.item-pic img').scrollLoading({
			attr: 'data-pic',
			container: $target,
			bind: 'ps-scroll-y'
		});
	}


	return {
		scrollLoad: new ScrollLoad()
	}
}())

loadItem.scrollLoad.init({
	url: '../js/mobile/customMobile.json',
	initNum: 20,
	loadNum: 10
})