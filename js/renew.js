;(function(){

	// 价格选择
	$('.price-item li.normal').click(function() {
		$(this).addClass('active').siblings().removeClass('active');
	});
})();