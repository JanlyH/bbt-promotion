var EditMobileDetailes = (function(){
	var $body = $('body'),
		isDrag = false,
		isCount = false;

	// 创建模块
	function createDom(el){
		var	_len = $('.custom-module').length,
		 	dom = '<div class="custom-module" data-index="'+ _len +'">'
				  +'<div class="module-default">请点击编辑模块</div><div class="moudule-ctrl"><ul class="ctrl-items">'
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
		var imgUrl = $(this).find('img').attr('src');
		if (!$('.module-edit-container').hasClass('in')) {
			$('.module-edit-container').addClass('in').animate({right: 0}, 300).find('.imgUrl').val(imgUrl);
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

	// 模块配置内容快隐藏
	function moduleEditOut(cb){
		$('.module-edit-container').removeClass('in').animate({right: '-280px'}, 300, function(){cb()});
	}

	// 绑定配置内容块cancel事件
	$('.module-edit-container').find('.cancel').click(function() {
		moduleEditOut(function(){
			$('.custom-module.edit').removeClass('edit');
		});
	});

	// 绑定配置内容块confirm事件
	$('.module-edit-container').find('.confirm').click(function() {
		var imgUrl = $('.imgUrl').val();
		if (imgUrl.length > 0) {
			$('.custom-module.edit').find('.module-content').append($('<img>').attr('src', imgUrl));
			$('.custom-module.edit').find('.module-default').remove();
		}
		moduleEditOut(function(){
			$('.custom-module.edit').removeClass('edit');
		});
	});
}())