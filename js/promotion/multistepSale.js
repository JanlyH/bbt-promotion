// 添加优惠时段
(function(){
	var $addBtn = $('.add-btn'),
		$sale = $('.multisetp-sale'),
		saleHtml = $sale.find('.sale-item').eq(0).html(),
		saleNum = 1;

	// 添加优惠时段事件
	$addBtn.click(function(){
		$('<div class="sale-item"></div>').appendTo($sale).html(saleHtml).append('<div class="close-btn">×</div>').hide().fadeIn(300).find('.num').text(saleNum+1);
		saleNum++;
	})

	// 删除优惠时段事件
	$sale.on('click', '.close-btn', function(){
		$(this).parent('.sale-item').fadeOut(300, function(){
			$(this).remove();
			var len = $sale.find('.sale-item').length;
			for (var i = 1; i < len; i++) {
				$sale.find('.sale-item').eq(i).find('.num').text(i+1);
			}
		});
		saleNum--;
	})

	// 鼠标滚动增加时分秒

	var hm = '', detail;
	var scrollFunc = function(e){
		var hourNum = $('.hour.active').val(),
			minNum = $('.min.active').val();
	    e = e || window.event; 
	    e.preventDefault();
	    if(e.wheelDelta){			//IE/Opera/Chrome
	    	detail = e.wheelDelta;
	    }else if(e.detail){			//Firefox
	    	detail = e.detail;
	    }
	    if (hm === 'hour') {
	    	if (hourNum <= 23 && hourNum >= 0) {
				if (detail === 120 || detail === -3) {
					hourNum++
					if (hourNum > 23) {
						hourNum = 0;
					}
				}else{
					hourNum--
					if (hourNum < 0) {
						hourNum = 23;
					}
				}
			}
			$('.hour.active').val(hourNum);
	    }
	    if (hm === 'min') {
	    	if (minNum <= 59 && minNum >= 0) {
				if (detail === 120 || detail === -3) {
					minNum++
					if (minNum > 59) {
						minNum = 0;
					}
				}else{
					minNum--
					if (minNum < 0) {
						minNum = 59;
					}
				}
			}
			$('.min.active').val(minNum);
	    }
	}

	/*注册事件*/ 
	$.fn.mouseWheel = function(e){
		e = e || window.event; 
		// firefox
		return this.each(function() {
			
			if(document.addEventListener){ 
			    this.addEventListener('DOMMouseScroll', scrollFunc, false); 
			}
			//IE/Opera/Chrome
			this.onmousewheel = scrollFunc;
		});
	}

	$sale.on('focus keyup', '.hour', function(e){
		$(window).unbind('scroll');
		hm = 'hour';
		$(this).addClass('active');
		var val = $(this).val(), reg = /^\d*$/, detail;
		if (!reg.test(val)) {
			$(this).val(0);
		}
		$(this).mouseWheel();
	})
	$sale.on('blur', '.hour', function(){
		$(document).bind('scroll');
		hm = '';
		$(this).removeClass('active');
	})
	$sale.on('focus keyup', '.min', function(e){
		$(document).unbind('scroll');
		hm = 'min';
		$(this).addClass('active');
		var val = $(this).val(), reg = /^\d*$/, detail;
		if (!reg.test(val)) {
			$(this).val(0);
		}
		$(this).mouseWheel();
	})
	$sale.on('blur', '.min', function(){
		$(document).bind('scroll');
		hm = '';
		$(this).removeClass('active');
	})

	// 鼠标滚动增加时分秒---end
}())