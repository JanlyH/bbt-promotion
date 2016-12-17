;(function(){

	/**
	 * 宝贝团 关联销售js
	 * ============================================================================
	 * 版本 : V1.0.0
	 * ============================================================================
	 * $Author: 梦菲创意设计工作室 BY TIZ $
	 * $Id: rmk.js 2015-11-16 15:17:05Z TIZ $
	*/

	/*初始化tips组件*/
	var tips = new showtips();


	


	/**
	*@timestap 2015-11-16
	*@描述 : 
	*@功能 : 复制按钮,代码在服务器上运行才有效果
	*/
	var clip = new ZeroClipboard( document.getElementById("d_clip_button"), {
 		 moviePath: "../js/ZeroClipboard.swf"
	} );

	
	clip.on( 'complete', function(client, args) {
	   tips.show('复制成功');
	} );


	

	/*nav状态，当等于0时左边nav的活动区域*/
	/*当等于1时，获取提取代码的响应事件*/
	var sli = 0;

	/*记录nav的状态*/
	var navstatus = 0;

	/**
	*@timestap 2015-11-16
	*@描述 : 
	*@功能 : 投放按钮事件
	*/

	$('body').on('click','.rmk-nav-putogd li a',function(){
		//不在投放状态下
		if(!isPushing){


			$('.rmk-nav-putogd li').removeClass('active');
			$(this).parent().addClass('active');
			//处于第一个nav下
			if(sli == 0){
				var _index = $(this).parent().index();
				
				var gdnums = $('.rmk-nav-putogd li:eq(1)').find('span').html();

				if(_index == 0){
					// $('.rmk-move-showbox').removeClass('rmslideleft').addClass('rmslideright');
					
					moveBoxRight();
					$('.rmk-footer-selall').find('.rmk-font-sel').remove();
					$('.rmk-footer-seltips').html('<p>已选择：<span>'+gdnums+'</span>个宝贝</p>');
					navstatus = 0;
				}else if(_index == 1){
					moveBoxLeft();

					

					$('.rmk-footer-selall').append('<p class="rmk-font-sel">已选择：<span>'+gdnums+'</span>个宝贝</p>')

					$('.rmk-footer-seltips').html('<p>准备投放</p>');
					navstatus = 1;

				}else if(_index == 2){

					$('.rmk-move-showbox').stop().animate({'left':'-200%'},1000,'easeOutExpo',function(){

					});

					navstatus = 2;

				}else if(_index == 3){
					$('.rmk-move-showbox').stop().animate({'left':'-300%'},1000,'easeOutExpo',function(){

					});

					navstatus = 3;
				}




			}else{
				var _index = $(this).parent().index();
				$('.rmk-nav-putogd li:eq(0) a').html('投放到宝贝');
				if(_index == 0){
					$('.rmk-move-showbox').css('left','0%');
					navstatus = 0;
				}else if(_index == 1) {
					$('.rmk-move-showbox').css('left','-100%');
					navstatus = 1;
				}else if(_index == 2) {
					$('.rmk-move-showbox').css('left','-200%');
					navstatus = 2;
				}else if(_index == 3) {
					$('.rmk-move-showbox').css('left','-300%');
					navstatus = 3;
				}



				$('.rmk-codeframe').fadeOut('slow','easeOutExpo',function(){
					$('.rmk-move-box').fadeIn('slow','easeOutExpo',function(){

					});
				});

				sli = 0;
			}
		}else{
			tips.show('请等待投放完成');
		}


	});


	/**
	*@timestap 2015-11-16
	*@描述 : 
	*@功能 : 提取代码按钮事件
	*/

	$('.rmk-getcode').bind('click',function(){
		if(!isPushing){
			sli = 'code';
			$('.rmk-footer-selall .rmk-recommend').attr('disabled','disabled');
			$('.rmk-nav-putogd li').removeClass('active');
			$('.rmk-nav-putogd li:eq(0)').find('a').html('投放模版')
			$('.rmk-move-box').fadeOut(400,'linear',function(){
				$('.rmk-codeframe').fadeIn(400,'linear',function(){

				});
			});
		}else{
			tips.show('请等待投放完成');
		}
		
	});



	/**
	*@timestap 2015-11-16
	*@描述 : 
	*@功能 : 中间部分向左移动作
	*/


	function moveBoxLeft(){
		$('.rmk-move-showbox').stop().animate({'left':'-100%'},1000,'easeOutExpo',function(){/*回调函数*/});
	}

	/**
	*@timestap 2015-11-16
	*@描述 : 
	*@功能 : 中间部分向右移动作
	*/
	function moveBoxRight(){
		$('.rmk-move-showbox').stop().animate({'left':'0%'},1000,'easeOutExpo',function(){/*回调函数*/});
	}

	/**
	*@timestap 2015-11-16
	*@描述 : 
	*@功能 : 第一个nav，宝贝选择事件，
	*/

	$('body').on('click','#pubgd .full-goods-box',function(){

		//取1-10000任意一个不相同的数来标记宝贝
		var raid = GetRandomNum(1,10000);

		if($(this).hasClass('goods-seled')){

			var ph = $('#rmkseldgd .full-goods-box');
			var atts = $(this).attr('rd_id');
			var _this = this;
			ph.each(function(){
				if($(this).attr('rd_id') == atts){
					if($(this).find('.pub-status-suc').length){
						tips.show('此商品已投放成功，请先执行取消投放操作');
					}else if($(this).find('.pub-status-fal').length){
						$(_this).addClass('full-goods-hover').removeClass('goods-seled');
						$('#rmkfail .full-goods-box[rd_id="'+atts+'"]').remove();
						$(this).remove();
						//统计选择数量
						sucTotal = 0;
						failTotal = 0;
						calTotal();
						pushEndAction();

					}else{
						$(_this).addClass('full-goods-hover').removeClass('goods-seled');
						$(this).remove();

					}




					
				}
			});
			

		}else{


			$(this).removeClass('full-goods-hover').addClass('goods-seled');
			$(this).attr('rd_id',raid);
			var phtml = $(this).html();
			var _html = '<div class="full-goods-box goods-seled" rd_id="'+raid+'">'+phtml+'</div>';
			$('#rmkseldgd').append(_html);

			



		}
		


		
		
		chageNums();

	});

	/**
	*@timestap 2015-11-16
	*@描述 : 
	*@功能 : 全选事件
	*/
	$('body').on('click','.rmk-footer-selall .rmk-recommend',function(){

		if(!isPushing){


			if(sli == 0){

				if($(this).hasClass('checkbox-active')){
					var gd = $('#pubgd .full-goods-box');
					gd.each(function(){
						if(!$(this).hasClass('goods-seled')){
							$(this).removeClass('full-goods-hover').addClass('goods-seled');
							var raid = GetRandomNum(1,10000);
							$(this).attr('rd_id',raid);
							var phtml = $(this).html();
							var _html = '<div class="full-goods-box goods-seled" rd_id="'+raid+'">'+phtml+'</div>';
							$('#rmkseldgd').append(_html);
						}
					});
					chageNums();
				}else{
					var gd = $('#pubgd .full-goods-box');

					gd.each(function(){
						var td_id = $(this).attr('rd_id');
						var ps = $('#rmkseldgd .full-goods-box[rd_id="'+td_id+'"]').find('.pub-status-suc');
						
						if(ps.length == 0){
							$(this).addClass('full-goods-hover').removeClass('goods-seled');
							$('#rmkseldgd .full-goods-box[rd_id="'+td_id+'"]').remove();
						}
					});
					chageNums();


				}




			}else{
				tips.show('该状况下无法完成该操作');
			}

		}else{
			tips.show('请等待投放完成');
		}
	});


	/**
	*@timestap 2015-11-16
	*@描述 : 
	*@功能 :标记选择的数量
	*/


	function chageNums(){
		var sel_num = 0;

		var kh = $('#pubgd .full-goods-box');


		kh.each(function(){
			if($(this).hasClass('goods-seled')){
				sel_num++;
			}
		});

		$('.rmk-nav-putogd li:eq(1)').find('span').html(sel_num);
		$('.rmk-footer-seltips p span').html(sel_num);
	}

	/**
	*@timestap 2015-11-16
	*@描述 : 
	*@功能 :获取一个没有标记过的数字
	*/
	
	function GetRandomNum(Min,Max)
	{   
		var Range = Max - Min;   
		var Rand = Math.random();
		var lj = $('#pubgd .full-goods-box');

		var num = Min + Math.round(Rand * Range);
		var flag = 0;
		lj.each(function(){
			if($(this).attr('rd_id') == num){
				flag = 1;
			}
		});

		if(flag){
			GetRandomNum(1,10000);
		}else{
			return num; 
		}

		
	}   


	//标记投放状态
	var isPushing = 0;

	/**
	*@timestap 2015-11-16
	*@描述 : 
	*@功能 :投放按钮事件
	*/

	$('.rmk-footer-publish').bind('click',function(){

		if(!isPushing){
			$('.rmk-recommend').attr('disabled','disabled');
			
			if(sli == 0){
				var rmtips = $('.rmk-footer-seltips p span').html();

				if(rmtips == 0){
					tips.show('请选择宝贝');
				}else{
					if(!$('.rmk-nav-putogd li:eq(1)').hasClass('active')){
						$('.rmk-nav-putogd li:eq(0)').removeClass('active');
						$('.rmk-nav-putogd li:eq(1)').addClass('active');
						moveBoxLeft();
						pubgoods();
						
					}else{
						pubgoods();
					}
					isPushing = 1;
				}
			}

		}else{
			tips.show('请等待投放完成');
		}

		
		
	});

	//标记成功和失败的总数

	var sucTotal = 0;
	var failTotal = 0;

	/**
	*@timestap 2015-11-16
	*@描述 : 
	*@功能 :投放后处理事件
	*/

	function pubgoods(){
		var rmkbox = $('#rmkseldgd .full-goods-box');
		var smar = [];
		if(rmkbox.length != 0){
			$('.rmk-footer-publish').html('正在投放...');
			rmkbox.each(function(){
				if($(this).find('.pub-status-suc').length){
					
				}else{
					var p = '<p class="rmk-pub-status pub-status-wait">等待投放</p>';
					$(this).removeClass('goods-seled').addClass('wait-push').append(p);
					smar.push($(this).index());
				}
				
			});
			sucTotal = 0;
			failTotal = 0;
			console.log(smar);
			pushing(0,smar);

		}else{
			tips.show('您还未选择宝贝');
		}

		

	}

	/**
	*@timestap 2015-11-16
	*@描述 : 
	*@功能 :投放后处理事件
	*/

	function pushing(local,leng){
		if(local == leng.length){
			$('.rmk-footer-seltips').html('<p>投放完成，成功 <i>'+sucTotal+'</i> 个，失败 <em>'+failTotal+'</em> 个</p>');
			tips.show('投放成功');
			//投放成功后实现动作
			calTotal();
			pushEndAction(leng);
			$('.rmk-recommend').removeAttr('disabled');
			isPushing =0;
			return;
		}


		$('#rmkseldgd .wait-push').eq(leng[local]).find('.rmk-pub-status').removeClass('pub-status-wait').addClass('pub-status-ing').html('正在投放');
		/*递归方式投放*/
		setTimeout(function(){
			//结束条件
			if(leng[local] == 1){
				$('#rmkseldgd .wait-push').eq(leng[local]).find('.rmk-pub-status').removeClass('pub-status-ing').addClass('pub-status-fal').html('投放失败');
				$('#rmkseldgd .wait-push').eq(leng[local]).append('<a href="javascript:;" class="rmk-repuh">重新投放</a>');

				$('#rmkfail').append('<div class="full-goods-box" rd_id="'+$('#rmkseldgd .wait-push').eq(leng[local]).attr('rd_id')+'">'+$('#rmkseldgd .wait-push').eq(leng[local]).html()+'</div>');
				$('#rmkfail .full-goods-box[rd_id="'+$('#rmkseldgd .wait-push').eq(leng[local]).attr('rd_id')+'"]').find('.pub-status-fal').remove();

				
				
			}else{
				$('#rmkseldgd .wait-push').eq(leng[local]).find('.rmk-pub-status').removeClass('pub-status-ing').addClass('pub-status-suc').html('投放成功');
				$('#rmkseldgd .wait-push').eq(leng[local]).append('<a href="javascript:;" class="rmk-puhcancel">取消投放</a>');



				$('#rmksuc').append('<div class="full-goods-box" rd_id="'+$('#rmkseldgd .wait-push').eq(leng[local]).attr('rd_id')+'">'+$('#rmkseldgd .wait-push').eq(leng[local]).html()+'</div>');
				$('#rmksuc .full-goods-box[rd_id="'+$('#rmkseldgd .wait-push').eq(leng[local]).attr('rd_id')+'"]').find('.pub-status-suc').remove();
				
												


			}


			
			$('#rmkseldgd .wait-push').eq(leng[local+1]).find('.rmk-pub-status').removeClass('pub-status-wait').addClass('pub-status-ing').html('正在投放');
			pushing(local+1,leng);

		},1000);
	}

	/**
	*@timestap 2015-11-16
	*@描述 : 
	*@功能 :投放后处理事件
	*/

	function calTotal(){
		$('#rmkseldgd .full-goods-box').each(function(){
			if($(this).find('.pub-status-fal').length){
				failTotal++;
			}else if($(this).find('.pub-status-suc').length){
				sucTotal++;
			}
		});
	}

	/**
	*@timestap 2015-11-16
	*@描述 : 
	*@功能 : 投放结束后的处理动作
	*/

	function pushEndAction(){
		$('.rmk-footer-publish').html('重新投放');
		if(!$('.rmk-nav-putogd .lj-suces').length){
			$('.rmk-nav-putogd').append('<li class="lj-suces"><a href="javascript:;">投放成功(<span>'+sucTotal+'</span>)</a></li><li class="lj-fail"><a href="javascript:;">投放失败(<span>'+failTotal+'</span>)</a></li>');
		}else{
			$('.rmk-nav-putogd').find('.lj-suces a span').html(sucTotal);
			$('.rmk-nav-putogd').find('.lj-fail a span').html(failTotal);
		}
		
	}

	/**
	*@timestap 2015-11-16
	*@描述 : 
	*@功能 : 取消投放按钮事件
	*/

	$('body').on('click','#rmkseldgd .full-goods-box .rmk-puhcancel',function(){
		var _this = this;
		var data_id = $(this).parent().attr('rd_id');
		$('#pubgd .goods-seled').each(function(){
			if($(this).attr('rd_id') == data_id){
				$(this).removeClass('goods-seled').addClass('full-goods-hover');
			}
		});

		$(_this).parent().fadeOut(1000,function(){

			$(_this).parent().remove();

			sucTotal = 0;
			failTotal = 0;
			calTotal();
			pushEndAction();
		});
		
	});

	/**
	*@timestap 2015-11-16
	*@描述 : 
	*@功能 : 待投放内重新投放事件
	*/


	$('body').on('click','#rmkseldgd .full-goods-box .rmk-repuh',function(){
		var _this = this;
		$(_this).parent().find('.rmk-pub-status').removeClass('pub-status-fal').addClass('pub-status-ing').html('正在投放');

		setTimeout(function(){
			$(_this).parent().find('.rmk-pub-status').removeClass('pub-status-ing').addClass('pub-status-suc').html('投放成功');
			$(_this).addClass('rmk-puhcancel').html('取消投放').removeClass('rmk-repuh');


			$('#rmksuc').append('<div class="full-goods-box" rd_id="'+$(_this).attr('rd_id')+'">'+$(_this).html()+'</div>');
			$('#rmksuc .full-goods-box[rd_id="'+$(_this).attr('rd_id')+'"]').find('.pub-status-suc').remove();
			

			sucTotal = 0;
			failTotal = 0;
			calTotal();
			pushEndAction();
		},1000);
		
	});

	/**
	*@timestap 2015-11-16
	*@描述 : 
	*@功能 : 投放失败窗格内的重新投放按钮事件
	*/

	$('body').on('click','#rmkfail .full-goods-box .rmk-repuh',function(){
		var _this = this;
		$(_this).parent().append('<p class="rmk-pub-status pub-status-ing">正在投放</p>');
		var tr_id = $(_this).parent().attr('rd_id');

		setTimeout(function(){
			$(_this).parent().find('.rmk-pub-status').removeClass('pub-status-ing').addClass('pub-status-suc').html('投放成功');
			$(_this).parent().fadeOut(1000,function(){
				$('#rmkseldgd .full-goods-box[rd_id="'+tr_id+'"]').find('.rmk-pub-status').removeClass('pub-status-fal').addClass('pub-status-suc').html('投放成功');

				$('#rmksuc').append('<div class="full-goods-box" rd_id="'+tr_id+'">'+$(_this).parent().html()+'</div>');
				$('#rmksuc .full-goods-box[rd_id="'+tr_id+'"]').find('.pub-status-suc').remove();
				$('#rmksuc .full-goods-box[rd_id="'+tr_id+'"]').find('.rmk-repuh').html('取消投放').addClass('rmk-puhcancel').removeClass('rmk-repuh');

				$('#rmkseldgd .full-goods-box[rd_id="'+tr_id+'"]').find('.rmk-repuh').html('取消投放').addClass('rmk-puhcancel').removeClass('rmk-repuh');



				$(_this).parent().remove();
				sucTotal = 0;
				failTotal = 0;
				calTotal();
				pushEndAction();
			});


			


			
		},1000);

	});
	
	/**
	*@timestap 2015-11-16
	*@描述 : 
	*@功能 : 投放成功窗格内的取消投放按钮事件
	*/


	$('body').on('click','#rmksuc .full-goods-box .rmk-puhcancel',function(){
		var rd_id = $(this).parent().attr('rd_id');
		$(this).parent().fadeOut(1000,function(){
			$('#rmkseldgd').find('.full-goods-box[rd_id="'+rd_id+'"]').remove();
			$('#pubgd').find('.full-goods-box[rd_id="'+rd_id+'"]').removeClass('goods-seled').addClass('full-goods-hover');

			sucTotal = 0;
			failTotal = 0;
			calTotal();
			pushEndAction();
		});
	});

})();