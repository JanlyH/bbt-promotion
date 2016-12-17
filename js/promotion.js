;(function(){

	
	/**
	 * 宝贝团 限时折扣js
	 * ============================================================================
	 * 版本 : V1.0.0
	 * ============================================================================
	 * $Author: 梦菲创意设计工作室 BY TIZ $
	 * $Id: bbindex.js 2015-11-16 12:30:05Z TIZ $
	*/


	/**
	*@timestap 2015-11-16
	*@描述 : 窗口滚动条监听事件
	*@功能 : 
	*/

	window.onscroll = function () { 
		var top = document.documentElement.scrollTop || document.body.scrollTop;

		if(top> 237){

			if($('.bb-slide-switch').attr('direction') == 'slideRight'){
				$('.prodise-cbox-thead').addClass('hd-box-fixed').find('.hd-box-shotip').css('paddingLeft','10px');


			}else{
				$('.prodise-cbox-thead').addClass('hd-box-fixed').find('.hd-box-shotip').css('paddingLeft','196px');


			}
			
		}else{
			$('.prodise-cbox-thead').removeClass('hd-box-fixed').find('.hd-box-shotip').css('paddingLeft','0px');
		}

		if(top > 70){
			$('.bb-content-nav').css('top',parseInt(top) - 70);
		}else{
			$('.bb-content-nav').css('top',"0px");
		}

		$('.bb-slide-switch').css('top',parseInt(top) +365);
	}
	

	/**
	*@timestap 2015-11-16
	*@描述 : 初始化加载动画插件
	*@功能 : 
	*/

	var ld = new Loading('.container-content-frame');



	/**
	*@timestap 2015-11-16
	*@描述 : 选择活动开始时间
	*@功能 : 
	*/

	$('#pro-start-day').bind('click',function(){
		pclndrInit({
			top : '40px',
			dateele : '#pro-start-day',
			success : function(date){
				//data返回的是当前选择的时间
				var dd = new Date(date).getTime();
				var endtime =  $('#pro-end-day span').html();
				if(endtime != ""){
					endtime = new Date(endtime).getTime();
					if(dd > endtime){
						tips.show('开始时间不能大于结束时间');
						$('#pro-start-day span').html('');
					}
				}
			}
		});
	});

	
	/**
	*@timestap 2015-11-16
	*@描述 : 选择活动结束时间
	*@功能 : 
	*/

	$('#pro-end-day').bind('click',function(){
		pclndrInit({
			top : '40px',
			dateele : '#pro-end-day',
			success : function(date){
				//data返回的是当前选择的时间
				var dd = new Date(date).getTime();
				var endtime =  $('#pro-start-day span').html();
				if(endtime != ""){
					endtime = new Date(endtime).getTime();
					if(dd < endtime){
						tips.show('结束时间不能小于开始时间');
						$('#pro-end-day span').html('');
					}
				}
			}
		});
	});

	/**
	*@timestap 2015-11-16
	*@描述 : 选择活动结束时间
	*@功能 : 
	*/


	$('.prodise-disinfo-dtime li a').bind('click',function(){
		$('.prodise-disinfo-dtime li').removeClass('active');
		$(this).parent().addClass('active');
	});

	/**
	*@timestap 2015-11-16
	*@描述 : 顶部nav转换事件
	*@功能 : 
	*/

	$('.prodise-disinfo-selul li a').bind('click',function(){
		$('.prodise-disinfo-selul li').removeClass('active');
		$(this).parent().addClass('active');

	});

	/**
	*@timestap 2015-11-16
	*@描述 : 下一步按钮事件
	*@功能 : 
	*/

	$('.prodise-subbtn').bind('click',function(){

		ld.init();
		debugger
		setTimeout(function(){
			ld.destory();
			$('.prodise-disinfo-box').hide();
			$('.prodise-cbox').show();
		},1500);

		
	});

	/**
	*@timestap 2015-11-16
	*@描述 : 上一步按钮事件
	*@功能 : 
	*/

	$('.prodise-cbox-prestep').bind('click',function(){
		$('.prodise-disinfo-box').show();
		$('.prodise-cbox').hide();
	});

	/**
	*@timestap 2015-11-16
	*@描述 : 发布活动按钮事件
	*@功能 : 
	*/

	$('.prodise-cbox-publishactivity').bind('click',function(){
		alert('发布活动');
	});

	/**
	*@timestap 2015-11-16
	*@描述 : 头部切换事件
	*@功能 : 
	*/

	$('.prodise-cbox-selul li a').bind('click',function(){
		ld.init();
		setTimeout(function(){
			ld.destory();
		},1000);
		$('.prodise-cbox-selul li').removeClass('active');
		$(this).parent().addClass('active');
	});

	// var seloptions = $('.prodise-cbox-tbody-seloptions');
	// $('#prodisecboxlistsel').bind('change',function(){
	// 	var Is_sel = $(this).prop('checked');
	// 	if(Is_sel){

	// 		seloptions.each(function(){
	// 			$(this).prop("checked",true);
	// 		});
	// 	}else{
	// 		seloptions.each(function(){
	// 			$(this).prop("checked",false);
	// 		});
	// 	}
	// });

	// $('.prodise-cbox-tbody-seloptions').bind('change',function(){
	// 	var nums = 0;
	// 	seloptions.each(function(){
	// 		if($(this).prop("checked")){
	// 			nums++;
	// 		}
	// 	})

	// 	if(seloptions.length == nums){
	// 		$('#prodisecboxlistsel').prop("checked",true);
	// 	}else{
	// 		$('#prodisecboxlistsel').prop("checked",false);

	// 	}

	// });



	/**
	*@timestap 2015-11-16
	*@描述 : 宝贝选择checkbox按钮事件
	*@功能 : 
	*/

	var ckb = $('[name="goosel"');

	ckb.each(function(){
		$(this).bind('click',function(){
			var nums = 0;
			setTimeout(function() {
				ckb.each(function(){
					if($(this).hasClass('checkbox-active')){
						nums++;
					}
				});
				if(ckb.length == nums){
					$('[cboxname="selall"]').addClass('checkbox-active');
				}else{
					$('[cboxname="selall"]').removeClass('checkbox-active');
				};
			},50);
		});
	});

	/**
	*@timestap 2015-11-16
	*@描述 : 全选按钮事件
	*@功能 : 
	*/

	$('[cboxname="selall"]').bind('click',function(){

		if($(this).hasClass('checkbox-active')){
			ckb.each(function(){
				$(this).removeClass('checkbox-active');
			});
		}else{
			ckb.each(function(){
				$(this).addClass('checkbox-active');
			});
		}

		

	});

	/**
	*@timestap 2015-11-16
	*@描述 : 隐藏或显示已加入的宝贝
	*@功能 : 
	*/

	$('.prodise-cbox-sel-showorhide li a').bind('click',function(){
		$('.prodise-cbox-sel-showorhide li').removeClass('active');
		$(this).parent().addClass('active');

		ld.init();

		setTimeout(function(){
			ld.destory();

		},1500);
	});


	

	
				

})();