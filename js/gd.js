;(function(){

	/**
	 * 宝贝团 宝贝管理js
	 * ============================================================================
	 * 版本 : V1.0.0
	 * ============================================================================
	 * $Author: 梦菲创意设计工作室 BY TIZ $
	 * $Id: bbindex.js 2015-11-16 11:30:05Z TIZ $
	*/

	//初始化form radio组件
	var radio = new fRadios();
	radio.init('.gd-head-radio');

	/**
	*@timestap 2015-11-16
	*@描述 : 展开详情按钮事件
	*@功能 : 
	*/

	$('.gd-tbody-opera-show').bind('click',function(){
		var direction = $(this).attr('direction');
		var _this = this;

		var lne = $(_this).parentsUntil('.gd-tb-tbody').parent().find('.gd-tb-tbody-hb .gd-tb-hb-tbody').length;
		var hei = 32 + lne*50 + "px";

		if(direction == 'slidedown'){

			$(this).parentsUntil('.gd-tb-tbody').parent().find('.gd-tb-tbody-hb').animate({'height':hei},1000,'easeOutExpo',function(){

				if(IsIE8()){
					$(_this).removeClass('opera-slidedown-native').addClass('opera-slideup-native').find('span').html('收起详情');	
				}else{
					$(_this).addClass('opera-slidedown-css3').find('span').html('收起详情');
				}
				$(_this).attr('direction','slideup');
			});
			
		}else{
			$(this).parentsUntil('.gd-tb-tbody').parent().find('.gd-tb-tbody-hb').animate({'height':"0px"},1000,'easeOutExpo',function(){
				if(IsIE8()){
					$(_this).addClass('opera-slidedown-native').removeClass('opera-slideup-native').find('span').html('展开详情');	
				}else{
					$(_this).removeClass('opera-slidedown-css3').find('span').html('展开详情');
				}
				$(_this).attr('direction','slidedown');
			});
		}
		
	});

	/**
	*@timestap 2015-11-16
	*@描述 : 头部nav转换
	*@功能 : 
	*/

	
	$('.gd-head-nav li a').bind('click',function(){
		$('.gd-head-nav li').removeClass('active');
		$(this).parent().addClass('active');
	});

})();