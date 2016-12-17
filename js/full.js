;(function(){

	/**
	 * 宝贝团 满送页面js
	 * ============================================================================
	 * 版本 : V1.0.0
	 * ============================================================================
	 * $Author: 梦菲创意设计工作室 BY TIZ $
	 * $Id: bbindex.js 2015-11-16 12:30:05Z TIZ $
	*/


	var radio = new fRadios();
	radio.init('.full-check-sm');
	radio.init('.full-highrow-sm');

	var cbox = new fCheckbox();
	cbox.init('.form-checkbox');

	var tips = new showtips();
	
	/**
	*@timestap 2015-11-16
	*@描述 : 点击宝贝后的样式切换
	*@功能 : 
	*/

	$('body').on('click','.full-goods-box',function(){
		if($(this).hasClass('goods-seled')){
			$(this).removeClass('goods-seled').addClass('full-goods-hover');
		}else{
			$(this).addClass('goods-seled').removeClass('full-goods-hover');
		}
		//计算商品数量
		calgoods();
	});


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
	*@描述 : 第三个页面中头部的切换效果
	*@功能 : 
	*/

	$('.full-selgoods-list li a').bind('click',function(){
		$('.full-selgoods-list li').removeClass('active');
		$(this).parent().addClass('active');
	});

	/**
	*@timestap 2015-11-16
	*@描述 : 第一个页面中的预览效果切换按钮事件
	*@功能 : 
	*/

	$('.step1nav li').bind('click',function(){
		$('.step1nav li').removeClass('active');
		$(this).addClass('active');
		var _index = $(this).index();
		$(this).parent().parent().find('.full-s1preshow-ccbox').hide().eq(_index).show();
	});

	/**
	*@timestap 2015-11-16
	*@描述 : 第二个页面中的预览效果切换按钮事件
	*@功能 : 
	*/

	$('.step2nav li').bind('click',function(){
		$('.step2nav li').removeClass('active');
		$(this).addClass('active');
		var _index = $(this).index();
		$(this).parent().parent().find('.full-s1preshow-ccbox').hide().eq(_index).show();
	});


	/**
	*@timestap 2015-11-16
	*@描述 : 选择活动名称
	*@功能 : 
	*/

	$('.prodise-disinfo-selul li a').bind('click',function(){
		$('.prodise-disinfo-selul li').removeClass('active');
		$(this).parent().addClass('active');
		$('#activityname').val($(this).html());
	});

	/**
	*@timestap 2015-11-16
	*@描述 : 选择活动时间
	*@功能 : 
	*/


	$('.prodise-disinfo-dtime li a').bind('click',function(){
		$('.prodise-disinfo-dtime li').removeClass('active');
		$(this).parent().addClass('active');
	});

	/**
	*@timestap 2015-11-16
	*@描述 : 步骤1中的下一步按钮事件
	*@功能 : 
	*/

	$('.full-step1-nextbtn').bind('click',function(){
		$('.full-container').hide();
		$('.full-activity-set').show();
	});

	/**
	*@timestap 2015-11-16
	*@描述 : 步骤2中的下一步按钮事件
	*@功能 : 
	*/

	$('.full-step2-nextbtn').bind('click',function(){
		$('.full-activity-set').hide();
		$('.full-selgoods').show();

	});

	/**
	*@timestap 2015-11-16
	*@描述 : 步骤2中的返回按钮事件
	*@功能 : 
	*/

	$('.full-step2-prebtn').bind('click',function(){
		$('.full-container').show();
		$('.full-activity-set').hide();
	});

	/**
	*@timestap 2015-11-16
	*@描述 : 步骤3中的返回按钮事件
	*@功能 : 
	*/

	$('.full-publish-prebtn').bind('click',function(){
		$('.full-activity-set').show();
		$('.full-selgoods').hide();
	});

	/**
	*@timestap 2015-11-16
	*@描述 : 步骤2中，优惠方式里的打折按钮事件{添加优惠方式}
	*@功能 : 
	*/

	$('body').on('click','.form-checkbox-pp[name="sfdiscount"]',function(){
		var _html = '<div class="full-highrow-srow">';
		_html+= '<div class="form-checkbox full-highrow-cb">';
		_html+= '<p class="form-checkbox-pp checkbox-active" ttp="checkbox" name="deldiscount"><i></i>打折/减价</p>';
		_html+= '</div>';
		_html+= '<div class="full-highrow-disorz">';
		_html+='<div class="full-highrow-sm">';
		_html+='<p class="full-radios radios-active" ttp="radios" name="yuan" value="4"><i></i>减</p>';
		_html+='<div class="full-highrow-dis">';
		_html+='<input type="text" class="form-control" autocomplete="off"/>';
		_html+='<p class="full-highrow-unit">元</p>';
		_html+='</div>';
		_html+='<p class="full-radios" ttp="radios" value="8" name="pisces"><i></i>打</p>';
		_html+='<div class="full-highrow-dis">';
		_html+='<input type="text" class="form-control" autocomplete="off" disabled="disabled"/> ';
		_html+='<p class="full-highrow-unit">折</p>';
		_html+='</div>';
		_html+='</div>';
		_html+='</div>';
		_html+='</div>';
											

			$(this).parent().parent().before(_html);
			// cbox.init('.form-checkbox');
			radio.init('.full-highrow-sm');
			$('.full-highrow-srow').find('[ttp="radios"]').bind('click',function(){
				$(this).parent().find('.form-control').attr('disabled','disabled');
				$(this).next('.full-highrow-dis').find('.form-control').removeAttr('disabled');
			});
			$(this).parent().remove();
			//检查该div内是否还有优惠方式
			isdelye();						
	});

	/**
	*@timestap 2015-11-16
	*@描述 : 步骤2中，优惠方式里的打折按钮事件{删除该优惠方式}
	*@功能 : 
	*/

	$('body').on('click','.form-checkbox-pp[name="deldiscount"]',function(){
		var _html = '<div class="form-checkbox full-highrow-cb">';
		_html += '<p class="form-checkbox-pp" ttp="checkbox" name="sfdiscount"><i></i>打折/减价</p></div>';
		//检查该div内是否还有优惠方式
		isAddnone();
		$(this).parent().parent().parent().find('.full-highrow-slpo').append(_html);
		// cbox.init('.form-checkbox');
		$(this).parent().parent().remove();
	});
	
	/**
	*@timestap 2015-11-16
	*@描述 : 步骤2中，优惠方式里的送礼品按钮事件{添加优惠方式}
	*@功能 : 
	*/

	$('body').on('click','.form-checkbox-pp[name="gifts"]',function(){
		var _html = '<div class="full-highrow-srow">';
		_html += '<div class="form-checkbox full-highrow-cb">';
		_html += '<p class="form-checkbox-pp checkbox-active" ttp="checkbox" name="delgifts"><i></i>送礼品</p>';
		_html += '</div>';
		_html += '<div class="full-highrow-gift">';
		_html += '<p class="full-highrow-selgift">礼品名称：</p>';
		_html += '<div class="full-highrow-giftname">';
		_html += '<input type="text" class="form-control" autocomplete="off"/>';
		_html += '</div>';
		_html += '<p class="full-highrow-seltips">（最多8个字）</p>';
		_html += '</div>';
		_html += '<div class="full-highrow-giftselect">';
		_html += '<p class="full-highrow-selfont">选择礼品</p>';
		_html += '<p class="full-highrow-selcontent">巧克力</p>';
		_html += '</div>';
		_html += '</div>';
							
		
		$(this).parent().parent().before(_html);
		// cbox.init('.form-checkbox');	
		$(this).parent().remove();
		//检查该div内是否还有优惠方式

		isdelye();								
	});

	/**
	*@timestap 2015-11-16
	*@描述 : 步骤2中，优惠方式里的送礼品按钮事件{删除优惠方式}
	*@功能 : 
	*/

	$('body').on('click','.form-checkbox-pp[name="delgifts"]',function(){
		var _html = '<div class="form-checkbox full-highrow-cb">';
			_html += '<p class="form-checkbox-pp" ttp="checkbox" name="gifts"><i></i>送礼品</p></div>';
		isAddnone();
		$(this).parent().parent().parent().find('.full-highrow-slpo').append(_html);
		// cbox.init('.form-checkbox');
		$(this).parent().parent().remove();

	});

	/**
	*@timestap 2015-11-16
	*@描述 : 步骤2中，优惠方式里的包邮按钮事件{添加优惠方式}
	*@功能 : 
	*/

	$('body').on('click','.form-checkbox-pp[name="discovery"]',function(){
		var _html = '<div class="full-highrow-srow">';
		_html += '<div class="form-checkbox full-highrow-cb">';
		_html += '<p class="form-checkbox-pp checkbox-active" ttp="checkbox" name="deldiscovery"><i></i>包邮</p>';
		_html += '</div>';
		_html += '<div class="full-highrow-discovey">';
		_html += '<p class="full-highrow-selzonefont">选择区域：</p>';
		_html += '<p class="full-highrow-selzone"></p>';
		_html += '</div>';
		_html += '</div>';
		$(this).parent().parent().before(_html);
		// cbox.init('.form-checkbox');
		$(this).parent().remove();
		isdelye();
																		
	});

	/**
	*@timestap 2015-11-16
	*@描述 : 步骤2中，优惠方式里的包邮按钮事件{删除优惠方式}
	*@功能 : 
	*/

	$('body').on('click','.form-checkbox-pp[name="deldiscovery"]',function(){
		var _html = '<div class="form-checkbox full-highrow-cb">';
			_html += '<p class="form-checkbox-pp" ttp="checkbox" name="discovery"><i></i>包邮</p></div>';
		isAddnone();
		$(this).parent().parent().parent().find('.full-highrow-slpo').append(_html);
		// cbox.init('.form-checkbox');
		$(this).parent().parent().remove();
	});


	/**
	*@timestap 2015-11-16
	*@描述 : {isAddnone}检查div内是否还有优惠方式，如果为空，就添加
	*@功能 : 
	*/


	function isAddnone(){
		var o = $('.full-highrow-slpo').length;
		if(o == 0){
			$('.full-highrow-sklrow').append('<div class="full-highrow-slpo"></div>');
		}
	}

	/**
	*@timestap 2015-11-16
	*@描述 : {isdelye}检查div内是否还有优惠方式，如果为空，就删除
	*@功能 : 
	*/


	function isdelye(){
		var alng = $('.full-highrow-slpo .form-checkbox').length;
		if(alng == 0){
			$('.full-highrow-slpo').remove();
		}
	}

	

	/**
	*@timestap 2015-11-16
	*@描述 : 第2步中添加按钮的html代码
	*@功能 : 
	*/


	function disModel(){
		/*

		<div class="full-discount-lev" style="display:none;">
							<div class="full-discount-head">
								<p>优惠等级<span>{nums}</span></p>
								<a href="javascript:;" class="deldiscount"><i></i>删除</a>
							</div>
							<div class="full-discount-smallrow">
								<p class="full-smallrow-title">买家消费满：</p>
								<div class="full-smallrow-inp">
									<input type="text" class="form-control full-smallrow-inpufrm"/>
									<div class="full-check-sm">
										<p class="full-radios radios-active" ttp="radios" name="yuan" value="4"><i></i>元</p>
										<p class="full-radios" ttp="radios" value="8" name="pisces"><i></i>件</p>
									</div>
								</div>
								<div class="form-checkbox">
									<p class="form-checkbox-pp" ttp="checkbox" name="fulllimit"><i></i>上不封顶</p>
								</div>
								<a href="javascript:;" class="form-problem"></a>
							</div>
							<div class="full-discount-highrow">
								<p class="full-highrow-head">优惠方式：</p>
								<div class="full-highrow-sklrow">
									<div class="full-highrow-slpo">
										<div class="form-checkbox full-highrow-cb">
											<p class="form-checkbox-pp" ttp="checkbox" name="sfdiscount"><i></i>打折/减价</p>
										</div>
										<div class="form-checkbox full-highrow-cb">
											<p class="form-checkbox-pp" ttp="checkbox" name="gifts"><i></i>送礼品</p>
										</div>
										<div class="form-checkbox full-highrow-cb">
											<p class="form-checkbox-pp" ttp="checkbox" name="discovery"><i></i>包邮</p>
										</div>
									</div>
									<!--
									<div class="full-highrow-srow">
										<div class="form-checkbox full-highrow-cb">
											<p class="form-checkbox-pp" ttp="checkbox" name="sfdiscount"><i></i>打折/减价</p>
										</div>
										 <div class="full-highrow-disorz">
											<div class="full-highrow-sm">
												<p class="full-radios radios-active" ttp="radios" name="yuan" value="4"><i></i>减</p>
												<div class="full-highrow-dis">
													<input type="text" class="form-control" autocomplete="off"/>
													<p class="full-highrow-unit">元</p>
												</div>
												<p class="full-radios" ttp="radios" value="8" name="pisces"><i></i>打</p>
												<div class="full-highrow-dis">
													<input type="text" class="form-control" autocomplete="off" disabled="disabled"/>
													<p class="full-highrow-unit">折</p>
												</div>
											</div>
										</div> 
									</div>
									-->
									<!--
									<div class="full-highrow-srow">
										<div class="form-checkbox full-highrow-cb">
											<p class="form-checkbox-pp" ttp="checkbox" name="gifts"><i></i>送礼品</p>
										</div>
										 <div class="full-highrow-gift">
											<p class="full-highrow-selgift">礼品名称：</p>
											<div class="full-highrow-giftname">
													<input type="text" class="form-control" autocomplete="off"/>
											</div>
											<p class="full-highrow-seltips">（最多8个字）</p>

										</div>
										<div class="full-highrow-giftselect">
											<p class="full-highrow-selfont">选择礼品</p>
											<p class="full-highrow-selcontent">巧克力</p>
										</div>

									</div>
									 -->
									 <!--
									<div class="full-highrow-srow">
										<div class="form-checkbox full-highrow-cb">
											<p class="form-checkbox-pp" ttp="checkbox" name="discovery"><i></i>包邮</p>
										</div>
										 <div class="full-highrow-discovey">
											<p class="full-highrow-selzonefont">选择区域：</p>
											<p class="full-highrow-selzone"></p>
										</div>

									</div>
									-->
									<!--
									<div class="full-highrow-srow">
										<div class="form-checkbox full-highrow-cb">
											<p class="form-checkbox-pp" ttp="checkbox" name="discovery"><i></i>送流量</p>
										</div>
										 <div class="full-highrow-discovey">
											<p class="full-highrow-selzonefont">选择区域：</p>
											<p class="full-highrow-selzone"></p>
										</div>

									</div>
									-->
								</div>
								
							</div>
						</div>
		*/
	}



	var model2 = {
		dismodel:disModel
	}


	function getmodel(m){
		debugger
		var r=/\/\*([\S\s]*?)\*\//m,
		m=r.exec(model2[m].toString());
		return m&&m[1]||m;
	}


	/**
	*@timestap 2015-11-16
	*@描述 : 第2步中添加按钮事件
	*@功能 : 
	*/

	$('.fuu-adddiscount').bind('click',function(){
		var num = $('.full-discount-lev').length;
		// var dismodel = getmodel('dismodel');
		var html = $('.full-discount-lev').eq(0).html();
		var dom = $('<div class="full-discount-lev"></div>').append(html);
		// var re = dismodel.replace(/\{nums\}/,num+1);


		$(this).before(dom);
		$(this).prev('.full-discount-lev').fadeIn();

		// radio.init('.full-check-sm');
		// radio.init('.full-highrow-sm');
		// cbox.init('.form-checkbox');
	});

	/**
	*@timestap 2015-11-16
	*@描述 : 第2步中删除按钮事件
	*@功能 : 
	*/


	$('body').on('click','.deldiscount',function(){
		var _this = this;
		var leng = $('.full-discount-lev').length;
		if(leng != 1){
			//确认框调用
			ccdiagle({
				content : "删除该优惠等级?",
				back : '取消',
				confirmFun : function(){
					
					if(leng == 1){
						tips.show('最后一个不能删除');
					}else{
						$(_this).parent().parent().fadeOut('slow',function(){
							$(this).remove();
						});
						var num = $('.full-discount-head');

						for(var i = 0 ; i < num.length ; i++){
							num.eq(i).find('span').html(i+1);
						}
					}
				},
				gobackFun : function(){

				}
			});
		}
		
	})

	/**
	*@timestap 2015-11-16
	*@描述 : 第3步中全选按钮
	*@功能 : 
	*/

	$('.form-checkbox-pp[name="selgoodsall"]').bind('click',function(){
		if($(this).hasClass('checkbox-active')){
			$('.full-goods-box').addClass('goods-seled');
		}else{
			$('.full-goods-box').removeClass('goods-seled');

		}
		//计算选择的产品数量
		calgoods();
	});

	/**
	*@timestap 2015-11-16
	*@描述 : 计算选择的产品数量
	*@功能 : 
	*/

	function calgoods(){
		var goods = $('.full-goods-box');
		var num = 0;
		goods.each(function(){
			if($(this).hasClass('goods-seled')){
				num++;
			}
		});
		$('.fuu-selgoods-numstips span').html(num);
	}


	// 增加优惠等级，预览效果同步增加
	$('.fuu-adddiscount').click(function(){
		
		$('.mjs-activity-remark').before('<li class="mjs-activity-item"><p class="j_tempPrice" style="display: inline-block;">订单满<span style="color: #FF0000; font-weight: bold;">元</span>，</p></li>');
	});

	// 删除优惠等级，预览效果同步增加
	$('body').on('click', '.full-box .deldiscount', function(){
		
		var mjsIndex = $(this).parents('.full-discount-lev').index();

		for(var i=0; i<$('.full-s1preshow-ccbox').size(); i++){
			var MjsBox = $('.full-s1preshow-ccbox')[i];
			// console.log($(MjsBox).find('.mjs-activity-item').eq(mjsIndex-1));
			if ($(MjsBox).find('.mjs-activity-item').size()>1) {
				$(MjsBox).find('.mjs-activity-item').eq(mjsIndex-1).remove();
			};
		};
		
	});

})();

