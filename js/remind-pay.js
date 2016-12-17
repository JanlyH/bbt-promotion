;(function(){
	$('.switch-bar').click(function(){
		if ($(this).hasClass('switch-off')) {
			$(this).removeClass('switch-off').addClass('switch-on');
			$(this).find('i').removeClass('switch-btn-off').addClass('switch-btn-on').stop().animate({'left':'35px'}, 200);
		}else{
			$(this).removeClass('switch-on').addClass('switch-off');
			$(this).find('i').removeClass('switch-btn-on').addClass('switch-btn-off').stop().animate({'left':'0'}, 200);
		};
	});
	var $bar = $('.category-slide-bar')
	var barLeft = $bar.position().left;
	$('.sub-category li').click(function(){
		var _index = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		$bar.stop().animate({left: $(this).position().left+'px'},200);
		if (_index <= 1) {
			$('.reminder').addClass('active').siblings().removeClass('active');
		}else if (_index > 1 && _index < 5) {
			$('.deliver').addClass('active').siblings().removeClass('active');
		}else if (_index >= 5 && _index < 8) {
			$('.receipt').addClass('active').siblings().removeClass('active');
		}else if (_index >= 8) {
			$('.after-sale').addClass('active').siblings().removeClass('active');
		};
		$('.def-cds-remind .sub-tab').eq(_index).removeClass('hide').siblings().addClass('hide');
	});
	$('.sub-category li').mouseover(function(){

		var left = $(this).position().left;
		$bar.stop().animate({left: left+'px'},200);
	})
	$('.sub-category').mouseleave(function() {

		var _left = $(this).find('li.active').position().left;
		$bar.stop().animate({left: _left+'px'},200);
	});
})();

(function(){
	$('.select-list').find('li.radio').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	})
	$('.select-list').find('li.checkbox').click(function(){
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		}else{
			$(this).addClass('active');
		}
	})
}())