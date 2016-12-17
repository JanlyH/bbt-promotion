;(function(){


	/**
	 * 活动列表
	 * ============================================================================
	 * 版本 : V1.0.0
	 * ============================================================================
	 * $Author: 梦菲创意设计工作室 BY TIZ $
	 * $Id: bbindex.js 2015-11-16 15:30:05Z TIZ $
	*/

	//初始化加载动画函数
	var ld = new Loading('.container-content-frame');

	/**
	*@timestap 2015-11-16
	*@描述 : 头部nav转换效果
	*@功能 : 头部nav转换效果
	*/

	$('.prolindis-content-headnav li a').bind('click',function(){
		var _index = $(this).parent().index();
		var dis = 120;
		$('.prolindis-content-headnav i').animate({left : dis*_index+"px"},320);

		ld.init();
		//加载数据
		setTimeout(function(){
			ld.destory();
		},1500);
	});

	/**
	*@timestap 2015-11-16
	*@描述 : 停止按钮确认框动作
	*@功能 : 
	*/

	$('.prolindis-tbody-btn').bind('click',function(){
		var Is_stop = $(this).hasClass('prolindis-tbody-stopbtn');
		if(Is_stop){
			ccdiagle({
				content : "是否停止该活动?",
				back : '取消',
				confirmFun : function(){
					alert('你点击了确认');
				},
				gobackFun : function(){
					alert('你点击了取消');

				}
			})
		}
	});

	/**
	*@timestap 2015-11-16
	*@描述 : 进度条动画
	*@功能 : 
	*/


	var progress = $('.progress-speed');
	progress.each(function(){
		var _width = $(this).attr('data_width');
		$(this).animate({"width" :_width },{ duration:1500,easing:'easeOutExpo' });
	});


	/**
	*@timestap 2015-11-16
	*@描述 : 窗口滑动条监听
	*@功能 : 
	*/



	window.onscroll = function () { 
		//获取滑动的高度
		var top = document.documentElement.scrollTop || document.body.scrollTop; 
		if(top>199){
			if($('.bb-slide-switch').attr('direction') == 'slideRight'){
				$('.prolindis-content-thead').addClass('fixnav').find('.prolindix-cc-th-fleft').css('paddingLeft','10px');

			}else{
				$('.prolindis-content-thead').addClass('fixnav').find('.prolindix-cc-th-fleft').css('paddingLeft','196px');

			}
		}else{
			$('.prolindis-content-thead').removeClass('fixnav').find('.prolindix-cc-th-fleft').css('paddingLeft','0px');
		}

		if(top > 70){
			$('.bb-content-nav').css('top',parseInt(top) - 70);
		}else{
			$('.bb-content-nav').css('top',"0px");
		}

		$('.bb-slide-switch').css('top',parseInt(top) +365);
	}

})();

