;(function(){
	/**
	* 宝贝团 共同js
	* ============================================================================
	* 版本 : V1.0.0
	* ============================================================================
	* $Author: 梦菲创意设计工作室 BY TIZ $
	* $Id: common.js 2015-10-30 16:50:00Z TIZ $
	*/
	
	/*
	*@功能：返回顶部
    */
    (function(){
    	$(window).scroll(function(){
    		if ($(document).scrollTop() > 200) {
				$('.to-top').fadeIn(200);
			}else{
				$('.to-top').fadeOut(200);
			};
    	});
    	$('.to-top').click(function(){
    		$('body, html').animate({
    			scrollTop: 0
    		}, 200)
    	})
    }());

    /**
	*@功能：tab切换;
	*@触发方式：‘click’和‘hover’;
	*@参数：trigger，值为字符串“click”和“hover”;
    **/
    (function(){
    	$.fn.tabPage = function(options){
			var dft = {
				trigger: 'click'
			};
			var opts = $.extend({}, dft, options);
			return this.each(function(){
				var $this = $(this);
				if (opts.trigger === 'click') {
					$this.find('li').click(function(){
						var _index = $(this).index();
			    		if (!$(this).hasClass('active')) {
			    			$(this).addClass('active').siblings().removeClass('active');
			    			$(this).parents('.tab-container').eq(0).find('.tab-content').eq(0).children('.tab-pane').eq(_index).addClass('show').siblings().removeClass('show');
			    		}
					})
				}else if(opts.trigger === 'hover'){
					$this.find('li').mouseover(function(){
						var _index = $(this).index();
			    		if (!$(this).hasClass('active')) {
			    			$(this).addClass('active').siblings().removeClass('active');
			    			$(this).parents('.tab-container').eq(0).find('.tab-content').eq(0).children('.tab-pane').eq(_index).addClass('show').siblings().removeClass('show');
			    		}
					})
				}
			});
		}
    }());


	/**
	*@timestap 2015-11-2
	*@描述 : 中部收缩展开按钮
	*@功能 : jquery animate 实现
	*/

	$('.bb-slide-switch').bind('click',function(){
		var direction = $(this).attr('direction');
		if(direction =="slideLeft"){
			$('.bb-content-nav').animate({left:'-175px'},500);
			$('.container-content-frame').animate({paddingLeft:'10px'},500);
			$('.rmk-footer-fixex').animate({paddingLeft:'10px'},500);
			$('.bb-slide-switch').animate({left:'0px'},500,function(){
				$(this).removeClass('mid-slide-left').addClass('mid-slide-right').attr("direction" , 'slideRight');
				
			});

			var kj = $('.prolindis-content-thead');
			if(kj.length){
				if(kj.hasClass('fixnav')){
					$('.prolindix-cc-th-fleft').animate({paddingLeft:'10px'},500);
				}
			}

			var prlist = $('.prodise-cbox-thead');
			if(prlist.length){
				if(prlist.hasClass('hd-box-fixed')){
					$('.hd-box-shotip').animate({paddingLeft:'10px'},500);
				}

				$('.footer-fixed-npi').animate({paddingLeft:'10px'},500);
			}

			var fuugix = $('.full-publish-btn');
			if(fuugix.length){
				$('.full-fixed-shotip').animate({paddingLeft:'10px'},500);
			}

		}else if(direction =="slideRight"){
			$('.bb-content-nav').animate({left:'3px'},500);
			$('.container-content-frame').animate({paddingLeft:'199px'},500);
			$('.rmk-footer-fixex').animate({paddingLeft:'199px'},500);
			$('.bb-slide-switch').animate({left:'189px'},500,function(){
				$(this).removeClass('mid-slide-right').addClass('mid-slide-left').attr("direction" , 'slideLeft');
			});

			var kj = $('.prolindis-content-thead');
			if(kj.length){
				if(kj.hasClass('fixnav')){
					$('.prolindix-cc-th-fleft').animate({paddingLeft:'199px'},500);
				}
			}


			var prlist = $('.prodise-cbox-thead');
			if(prlist.length){
				if(prlist.hasClass('hd-box-fixed')){
					$('.hd-box-shotip').animate({paddingLeft:'199px;'},500);
				}

				$('.footer-fixed-npi').animate({paddingLeft:'196px'},500);
			}

			var fuugix = $('.full-publish-btn');
			if(fuugix.length){
				$('.full-fixed-shotip').animate({paddingLeft:'199px'},500);
			}
		}
		
	});


	

	/**
	*@timestap 2015-10-30
	*@描述 : 顶部user信息模态框事件
	*@功能 : 鼠标移动事件
	*/


	$('.bb-usernav').hover(function(){
		$('.bb-usermodel').fadeIn(300);
	},function(){
		$('.bb-usermodel').fadeOut(300);
	});

	/**
	*@timestap 2015-10-30
	*@描述 : 初始化导航栏状态，加载页面时检测 {.bb-content-list} 此元素下是否有 {.active} 样式，如果有，则打开该导航栏
	*@功能 : 类似描述
	*/

	var nav_list = $('.bb-content-list');
	nav_list.each(function(){
		if($(this).hasClass('init-status')){
			$(this).find('em').addClass('allow-up');
			$(this).find('dd').slideDown();
		}
	});


	/**
	*@timestap 2015-10-30
	*@描述 : 导航栏事件，点击dt标题可以打开或关闭每一个list，效果类似手风琴
	*@功能 : 初始化状态，jquery slideDown slideUp动画
	*/

	$('.bb-content-nav dl dt').bind('click',function(){

		//初始化所有状态
		var is_active = $(this).parent().hasClass('list-active');
		var slide_Span = $('.bb-content-slide');
		if(!is_active){
			$('.bb-content-nav dl').removeClass('list-active').find('dd').slideUp();
			$('.bb-content-nav dl').find('dt em').removeClass('allow-up');
			$(this).find('em').addClass('allow-up');
			$(this).parent().addClass('list-active').find('dd').slideDown();
			
			
		}else{
			$(this).parent().removeClass('list-active').find('dd').slideUp();
			$(this).parent().find('dt em').removeClass('allow-up');
			
			
		}
		


	});

	
		window.onscroll = function () { 
		var top = document.documentElement.scrollTop || document.body.scrollTop; 

			if(top > 70){
				$('.bb-content-nav').css('top',parseInt(top) - 70);
			}else{
				$('.bb-content-nav').css('top',"0px");
			}

			$('.bb-slide-switch').css('top',parseInt(top) +365);

		}
	

	



})();


/**
*@timestap 2015-11/1
*@描述 : 检测是否为IE8浏览器
*@功能 : 
*/

function IsIE8(){
	return navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i)=="8." ? true : false;	
}


function Loading(ele){
	this.html = '<div class="bb-info-model"></div><div class="bb-info-loading"><img src="../imgs/loading.png"/><p>请稍候</p></div>';
	this.ele = ele;
}

Loading.prototype.init = function(){
	$(this.ele).append(this.html);
}

Loading.prototype.destory= function(){
	$('.bb-info-model').remove();
	$('.bb-info-loading').remove();
}

function showtips(c){
	this.i = 1;
}

showtips.prototype.show = function(content){
	$('body').append('<div class="tipsmodle"><p>'+content+'</p></div>');
	var twidth = $('.tipsmodle').css('width');
	$('.tipsmodle').css('marginLeft',- parseInt(twidth) / 2 + "px").show();
	this.showAction();
}

showtips.prototype.showAction = function(){	
	var _this = this;
	$('.tipsmodle').animate({opacity : "0.9" , bottom : "25%"},100,"linear",function(){
		var tips_index = this;
		setTimeout(function(){
			_this.destoryTips(tips_index);
		},2000)
	});
}

showtips.prototype.destoryTips = function(_this){	

	$(_this).animate({opacity : "0" , bottom : "30%"},100,"linear",function(){
		$(_this).remove();
	});
}	


/**
*@timestap 2015-11-14
*@描述 : 定义radio组件
*@功能 : radio组件
*/


var fRadios = function(){

}

fRadios.prototype.init = function(ele){
	var rd = $(ele).find('[ttp="radios"]');
	$('body').off('click',ele+' p[ttp="radios"]');
	$('body').on('click',ele+' p[ttp="radios"]',function(){
		$(this).parents(ele).find('[ttp="radios"]').removeClass('radios-active');
		$(this).addClass('radios-active');
	});
	
}


var radios = new fRadios();
radios.init('.form-radios');


/**
*@timestap 2015-11-14
*@描述 : 定义Checkbox 组件
*@功能 : Checkbox组件
*/
var fCheckbox = function(){

}

fCheckbox.prototype.init = function(ele){
	var ccb = $(ele).find('[ttp="checkbox"]');
	$('body').off('click',ele+' p[ttp="checkbox"]');
	$('body').on('click',ele+' p[ttp="checkbox"]',function(){
		if($(this).attr('disabled') != 'disabled' && $(this).attr('data-allow') != 'false'){
			if($(this).hasClass('checkbox-active')){
				$(this).removeClass('checkbox-active');
			}else{
				$(this).addClass('checkbox-active');
			}
		}
		var len = $('[name="goosel"].checkbox-active').length;
		$('.seledNums').text(len);
	});
}


var ckbox = new fCheckbox();
ckbox.init('.form-checkbox');

//全选
//	全选
var ckb = $('[name="goosel"]');

ckb.each(function() {
	$(this).bind('click', function() {
		var nums = 0;
		setTimeout(function() {
			ckb.each(function() {
				if ($(this).hasClass('checkbox-active')) {
					nums++;
				}
			});
			if (ckb.length == nums) {
				$('[cboxname="selall"]').addClass('checkbox-active');
			} else {
				$('[cboxname="selall"]').removeClass('checkbox-active');
			};
		}, 50);
	});
});

$('[cboxname="selall"]').bind('click', function() {
	if ($(this).hasClass('checkbox-active')) {
		ckb.each(function() {
			$(this).removeClass('checkbox-active');
		});
		
	} else {
		ckb.each(function() {
			$(this).addClass('checkbox-active');
		});
		
	}
});

// 开关
(function(){
	$('.switch-bar').click(function(){
		if ($(this).hasClass('switch-off')) {
			$(this).removeClass('switch-off').addClass('switch-on');
			$(this).find('i').removeClass('switch-btn-off').addClass('switch-btn-on').stop().animate({'left':'35px'}, 200);
		}else{
			$(this).removeClass('switch-on').addClass('switch-off');
			$(this).find('i').removeClass('switch-btn-on').addClass('switch-btn-off').stop().animate({'left':'0'}, 200);
		};
	});
})();

// 下拉菜单
$('.dropdown-toggle').dropdown();

//ul模拟select下拉框
(function(){
	$('.dropdown-menu li').click(function(){
		var selectVal = $(this).text();
		$(this).parent().siblings('a').html(selectVal+'<span class="caret"></span>');
		if ($(this).parents('.dropdown').hasClass('.onchange')) {
			if (selectVal) {};
		};
	});
})();

$('[data-toggle="popover"]').popover();

/**
 * @描述 无线详情、限时折扣创建等页面发布按钮条固定屏幕底部； 
 * @功能 滚动事件；
 */
function publishBar(){
	var $bar = $('.footer-fixed-bar');
	var $win = $(window);
	var winH = $win.height();
	var parentH = $bar.parent().height()+70;
	if(($win.scrollTop() + winH - parentH) > 0){
		$bar.css('position', 'absolute');
	}else{
		$bar.css('position', 'fixed');
	};
	$win.scroll(function(){
		if(($win.scrollTop() + winH - parentH) > 0){
			$bar.css('position', 'absolute');
		}else{
			$bar.css('position', 'fixed');
		};
	});
};

$('[data-toggle="tooltip"]').tooltip()

function IsIE8() {
		return navigator.appName == "Microsoft Internet Explorer"
				&& navigator.appVersion.match(/8./i) == "8." ? true : false;
}