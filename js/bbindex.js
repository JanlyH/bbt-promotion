;(function(){

	/**
	 * 宝贝团首页js
	 * ============================================================================
	 * 版本 : V1.0.0
	 * ============================================================================
	 * $Author: 梦菲创意设计工作室 BY TIZ $
	 * $Id: bbindex.js 2015-10-30 16:50:00Z TIZ $
	*/



	/**
	*@timestap 2015-10-30
	*@描述 : 中部图片轮播模块
	*@功能 : 利用css3实现图片的轮播
	*/

	

	$('.bb-showbox-head li').bind('mouseenter',function(){
		var _index  = $(this).index();

		var isIE = IsIE8();

		if(_index == 0){
			$('.bb-showbox-head i').removeClass('trsns-position1').removeClass('trsns-position2');
			$('.bb-showbox-cc-box').removeClass('bb-showbox-transition1').removeClass('bb-showbox-transition2');
			//IE8使用jquery动画过渡
			if(isIE){
				$('.bb-showbox-head i').animate({left:'0px'},500);
				$('.bb-showbox-cc-box').animate({left:'0%'},1000);
			}

		}else if(_index == 1){
			$('.bb-showbox-head i').removeClass('trsns-position2').addClass('trsns-position1');
			$('.bb-showbox-cc-box').removeClass('bb-showbox-transition2').addClass('bb-showbox-transition1');
			//IE8使用jquery动画过渡
			if(isIE){
				$('.bb-showbox-head i').animate({left:'120px'},500);
				$('.bb-showbox-cc-box').animate({left:'-100%'},1000);

			}
		}else if(_index == 2){
			$('.bb-showbox-head i').removeClass('trsns-position1').addClass('trsns-position2');
			$('.bb-showbox-cc-box').removeClass('bb-showbox-transition1').addClass('bb-showbox-transition2');
			//IE8使用jquery动画过渡
			if(isIE){
				$('.bb-showbox-head i').animate({left:'240px'},500);
				$('.bb-showbox-cc-box').animate({left:'-200%'},1000);
			}
				


		}
		$('.bb-showbox-head li').removeClass('active').eq(_index).addClass('active');



	});

	

	


	

	


	


	




	

	var model = {
		load : loadingModel,
		list : listModel
	};

 	function getmodel(m){
  		var r=/\/\*([\S\s]*?)\*\//m,
		m=r.exec(model[m].toString());
		return m&&m[1]||m;
  	}

	/**
	*@timestap 2015-10-30
	*@描述 : 轮播图事件，下一页按钮触发
	*@功能 : 包括模态框和数据显示
	*/

	$('.bb-show-nextpage').bind('click',function(){
		var _html = getmodel('load');
		$('.bb-info-showbox').append(_html);

		/**发送信息到服务器**/

		/**服务器返回信息后执行此操作**/
		setTimeout(function(){
			destoryLoading();
			var list_html = getmodel('list');
			var a = $('.bb-showbox-head li');
			a.each(function(){
				if($(this).hasClass('active')){
					$('.bb-showbox-cc-box').find('.bb-showbox-gorund').eq($(this).index()).html(list_html);
				}
			});
		},2500);

	});

	/**
	*@timestap 2015-10-30
	*@描述 : 以下函数为获取函数内的html标签
	*@功能 : 类似描述
	*/


	function loadingModel(){
		/*
			<div class="bb-info-model"></div>
			<div class="bb-info-loading"><img src="./imgs/loading.png"/><p>请稍候</p></div>
		*/
	}

	function listModel(){
		/*
			<div class="col-md-4 bb-showbox-frame">
				<div class="bb-showbox-content">
					<img src="./imgs/showbox3.png"/>
				</div>
			</div>
			<div class="col-md-4 bb-showbox-frame">
				<div class="bb-showbox-content">
					<img src="./imgs/showbox1.png"/>
				</div>
			</div>
			<div class="col-md-4 bb-showbox-frame">
				<div class="bb-showbox-content">
					<img src="./imgs/showbox2.png"/>
				</div>
			</div>
		
		*/
	}

	function destoryLoading(){
		$('.bb-info-model').remove();
		$('.bb-info-loading').remove();
	}





	

	



  	



	// var initController = GetHash('con');
	// var initAction = GetHash('act');

	// Router(initController,initAction);

	// function Router(controller,action){
	// 	console.log(controller);
	// 	console.log(action);
	// 	if(controller){

	// 		if(controller == "discount"){
	// 			var discountObj = new discountObject();
	// 			discountObj.init();
	// 		}

	// 	}else{

	// 	}
	// }


	// function GetHash(name)
	// {
	//      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	//      var r = window.location.hash.substr(1).match(reg);
	//      if(r!=null)return  unescape(r[2]); return null;
	// }


})();