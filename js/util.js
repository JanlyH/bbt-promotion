Util = {
	/** 打折和满就送单个活动能参与宝贝数 */
	act_item_size : 150,
	invalidPromotionTitle : ['限时打折','限时特价','满就减','双十一','双11','天天特价','限时折扣','聚划算','年中大促','年中促销','年中促'],
	validPromotionTitle : ['团购折扣价','最后一天','限时促销','只此一天','新款促销','折扣价','限时优惠','限时抢购','夏季促销','仅此一天','特价*',
	                  '正品*','最后*','新*','拍下*','年中*','春*','夏*','秋*','冬*','促销*','仅*','亏*'],
    invalidSendTitle : ['限时打折','限时特价','满就减','双十一','双11','天天特价','限时折扣','聚划算'],
    validSendTitle : ['满就送','超级满就送','买就送','满就包邮','满立减','两件包邮','满减','满百包邮','买二送一','多买多优惠','新品促销','2件包邮','限时促销','满包邮','新店开张','多买多送','买一送一','全场*','拍*','买*'],
	forwardTo : function(url,timeout,isTop){
		if (isTop){
			if (timeout){
				if (typeof $("body").oneTime == 'function'){
					$("body").oneTime(timeout / 1000 + 's',function(){
						window.top.location.href=url;
					});
				}else{
					window.top.location.href=url;
				}
			}else{
				window.top.location.href=url;
			}
		}else{
			if (timeout){
				if (typeof $("body").oneTime == 'function'){
					$("body").oneTime(timeout / 1000 + 's',function(){
						window.location.href=url;
					});
				}else{
					window.location.href=url;
				}
			}else{
				window.location.href=url;
			}
		}
	},
	/**
	 * 宝贝弹窗主键 itemCount：要选择的宝贝数 inputMap：回填数据Map title：弹窗标题，默认为“添加/修改宝贝”
	 * configPageSize：每页显示数据，默认16条 isShowTopOption：是否显示表头 checkAll：是否有全选按钮
	 * isHideSubmitBtn：是否隐藏确定按钮 onSubmitCallback：确认后的回调函数
	 * onItemSelectCallback：选择宝贝后的回调函数
	 * componentId：一个页面引用多个主键时，避免冲突构造的id，默认为itemSelectComponent
	 */
	renderItemSelectPageAsPopWindow : function(itemCount, inputMap, title, configPageSize, isShowTopOption, checkAll, isHideSubmitBtn, onSubmitCallback, onItemSelectCallback, componentId){
		if (componentId == undefined){
			componentId = 'itemSelectPopWindow';
		}
		if (title == undefined){
			title = '添加/修改宝贝';
		}
		if (isShowTopOption == undefined){
			isShowTopOption = true;
		}
		if (configPageSize == undefined){
			configPageSize = 16;
		}
		if (checkAll == undefined){
			checkAll = false;
		}
		if (isHideSubmitBtn == undefined){
			isHideSubmitBtn = false;
		}
		if (onSubmitCallback == undefined){
			onSubmitCallback ='onPopItemListSubmit';
		}
		if (onItemSelectCallback == undefined){
			onItemSelectCallback = '';
		}
		var url = "/common/item-list.action?componentId="+componentId+"&inputMap="+inputMap+"&isShowTopOption="+isShowTopOption+"&itemCount="+itemCount+"&configPageSize="
			+configPageSize+"&checkAll="+checkAll+"&isHideSubmitBtn="+isHideSubmitBtn+"&onSubmitCallback=" 
			+ onSubmitCallback+"&onItemSelectCallback=" + onItemSelectCallback;
		var popAttr = 
		{
			title : title,
			url : url,
			width : 900,
			height: 647,
			drag: true,
			submitBtn : false,
			closeBtn : false
		};
		Util.popWindow(popAttr);			
	},
	/**
	 * 宝贝列表主键 containerId：要渲染的Id inputMap：回填数据Map configPageSize：每页显示数据，默认24条
	 * onItemSelectCallback：选择宝贝后的回调函数
	 * componentId：一个页面引用多个主键时，避免冲突构造的id，默认为itemSelectComponent
	 * callback：加载宝贝后的回调方法
	 */
	renderItemSelectPage : function(containerId, inputMap, configPageSize, onItemSelectCallback, componentId, callback){
		if (containerId == undefined){
			containerId = 'itemSelectContainer';
		}
		if (configPageSize == undefined){
			configPageSize = 24;
		}
		if (componentId == undefined){
			componentId = 'itemSelectComponent';
		}
		if (onItemSelectCallback == undefined){
			onItemSelectCallback = '';
		}
		var url = "/common/item-list.action?componentId="+componentId+"&inputMap="+inputMap+"&configPageSize="
			+configPageSize+"&checkAll=false&isHideSubmitBtn=true&onItemSelectCallback=" + onItemSelectCallback;
		Util.loadPageByAjax(containerId, url, null, null, callback);
	},
	setIframeHeight : function(obj) {
		var win = obj;
		if (document.getElementById) {
			if (win && !window.opera) {
				if (win.contentDocument && win.contentDocument.body.offsetHeight)
					win.height = win.contentDocument.body.offsetHeight + 15;
				else if (win.Document && win.Document.body.scrollHeight)
					win.height = win.Document.body.scrollHeight+15;
			}
		}
	},
	json2str : function(o) {
		return JSON.stringify(o);
	},
	str2json : function(str) {
		var jsonObj;
		try {
			jsonObj = eval("(" + str + ")");
		} catch (e) {
			jsonObj = str;
		}
		return jsonObj;
	},
	arrayToJson : function(arrayName,arrayInfo){
		var map = new Map();
		if (arrayInfo){
			$(arrayInfo).each(function(index,value){
				for(var k in value){
					map.put(arrayName + "[" + index + "]." + k ,value[k]);
				}
			})
		}
		return map.data;
	},
	arrayToMap : function(arrayName,arrayInfo){
		var map = new Map();
		if (arrayInfo){
			$(arrayInfo).each(function(index,value){
				for(var k in value){
					map.put(arrayName + "[" + index + "]." + k ,value[k]);
				}
			})
		}
		return map;
	},
	mergeJson : function(json1,json2){
		var map = new Map();
		if (json1){
			for (var key in json1){
				map.put(key,json1[key]);
			}
		}
		if (json2){
			for (var key in json2){
				map.put(key,json2[key]);
			}
		}
		return map.data;
	},
	deleteReturnKey : function(obj) {
		var reg = new RegExp("\r\n", "g");
		var a = obj.replace(reg, "");
		var reg2 = new RegExp("\n", "g");
		var b = obj.replace(reg2, "");
		// for IE9
		if (a.length > b.length) {
			obj = obj.replace(reg2, "");
		}
		// for IE7/8
		else if (a.length < b.length) {
			obj = obj.replace(reg);
		}
		return obj;
	},
	/**
	 * 异步提交form form:待提交的form,必传 ajaxUrl:请求的URL,如果未传则默认取form的action属性值,非必传
	 * afterSubmit:请求之后的回调，默认传入参数为json,非必传
	 * beforeSubmit:请求之前的回调，默认传入json(表单的json格式属性值),返回true才提交请求,非必传
	 * method:提交方法，可选值"get","post",非必传,默认值为"post"
	 * clearForm:提交返回成功后是否需要清除form的属性值,可选值true,false,非必传，默认false
	 * resetForm:提交返回成功后是否需要重置form的属性值,可选值true,false,非必传，默认false
	 * errorCallback:提交返回异常时(如超时)的回调，默认传入json(通过json.statusText取得错误信息),非必传
	 * timeout:超时时间，非必传，默认30000毫秒
	 */
	ajaxSubmitForm : function(form, ajaxUrl, afterSubmit, beforeSubmit, errorCallback, method, clearForm, resetForm, timeout) {
		method = !method ? "post" : method;
		clearForm = !clearForm ? false : clearForm;
		resetForm = !resetForm ? false : resetForm;
		timeout = !timeout ? 10000 : timeout;
		ajaxUrl = ajaxUrl || $(form).attr("action");
		ajaxUrl = ajaxUrl.indexOf("?") == -1 ? ajaxUrl + "?ts=" + new Date().getTime() : ajaxUrl + "&" + new Date().getTime();

		var options = {
			url : ajaxUrl,
			type : method,
			dataType : "json",
			clearForm : clearForm,
			resetForm : resetForm,
			beforeSubmit : function() {
				return !beforeSubmit ? true : beforeSubmit(Util.getFormJson(form));
			},
			success : function(json, statusText) {
				if (afterSubmit) {
					afterSubmit(json);
				}
			},
			error : function(json) {
				if (!errorCallback) {
					Util.notifyError("系统繁忙，请稍后再试！");
				} else {
					errorCallback(json);
				}
			},
			timeout : timeout
		};

		$(form).ajaxForm(options);
		$(form).submit();
	},
	resetForm : function(form) {
		$(form).children().remove();
	},
	clearForm : function(form) {
		$(':input', form).each(function() {
			var type = this.type;
			var tag = this.tagName.toLowerCase();
			if (type == 'text' || type == 'password' || tag == 'textarea')
				this.value = "";
			else if (type == 'checkbox' || type == 'radio')
				this.checked = false;
			else if (tag == 'select')
				this.selectedIndex = 0;
		});
	},
	addFormProperty : function(form, propertyName, propertyValue) {
		if (eval("Util.getFormJson(form)" + "." + propertyName) == undefined) {
			$(form).append($('<input type="hidden" name="' + propertyName + '" value="' + propertyValue + '"/>'));
		} else {
			$(form).find("[name='" + propertyName + "']").remove();
			$(form).append($('<input type="hidden" name="' + propertyName + '" value="' + propertyValue + '"/>'));
		}
	},
	getFormJson : function(form) {
		var o = {};
		var a = $(form).serializeArray();
		$.each(a, function() {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [ o[this.name] ];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	},
	/**
	 * isNotDisplay 是否不显示菊花
	 */
	loadPageByAjax : function(containerId, url, param, pos, callback, isNotDisplay) {
		var openLoading = {};
		var pageContent = $.ajax({
			type : "POST",
			dataType : "html",
			url : url,
			data : param,
			async : true,
			beforeSend : function() {
				if(isNotDisplay){
					return;
				}
				openLoading = setTimeout('Util.loadingPage(1)', 1000);
			},
			success : function(pageContent) {
				if (!pos) {
					if ($(pageContent).find("#" + containerId)[0]) {
						$("#" + containerId).html($(pageContent).find("#" + containerId).html());
					} else {
						$("#" + containerId).html(pageContent);
					}           
					var headerContent = "<div>" + pageContent.substring(pageContent.indexOf("<head>"),pageContent.indexOf("</head>")) + "</div>";
					$(headerContent).find('link[rel=stylesheet]').each(function(){
						var isLinkExist = false;
						var existLink;
						var currentLink = $(this).attr("href");
						if (currentLink){
							$('link[rel=stylesheet]').each(function(){
								existLink = $(this).attr("href");
								if (existLink.split("?")[0] == currentLink.split("?")[0]){
									isLinkExist = true;
									return;
								}
							});
							if (!isLinkExist){
								$link(currentLink);
							}
						}
					});
				} else if (pos == 1) {
					$(pageContent).insertAfter("#" + containerId);
				} else if (pos == 2) {
					$(pageContent).insertBefore("#" + containerId);
				}
				if (typeof callback == "function") {
					callback(pageContent, param)
				}
			},
			complete : function() {
				if (typeof initPage == 'function') {
					initPage();
				}
				clearTimeout(openLoading);
				Util.loadingPage(0);
			}
		});
	},
	getPageByAjax : function(url, param) {
		return Util.ajax({
			type : "POST",
			dataType : "html",
			url : url,
			data : param,
			async : false
		}).responseText;
	},
	isBlank : function(str) {
		if (parseFloat(str) || parseFloat(str) == 0) {
			return false;
		} else {
			var temp = Util.trimSBCcase(Util.trim(str));
			if (temp.length == 0) {
				return true;
			}
			return false;
		}
	},
	trim : function(str) {
		if (parseFloat(str) || parseFloat(str) == 0) {
			return str;
		} else {
			str = (str || "").replace(/^\s\s*/, '');
			var ws = /\s/, i = str.length;
			while (ws.test(str.charAt(--i)))
				;
			return str.slice(0, i + 1);
		}
	},
	byteLength : function(str) {
		return (str || "").replace(/[^\x00-\xff]/g, "**").length;
	},
	/**
	 * 将某个字符串两边的全角空格过滤掉
	 */
	trimSBCcase : function(str) {
		if (parseFloat(str) || parseFloat(str) == 0) {
			return str;
		} else {
			return (str || "").replace(/(^[\s\u3000]*)|([\s\u3000]*$)/g, "");
		}
	},
	/**
	 * 对传入的字符串进行截取,只适用于GBK编码,如最后一个字符为汉字，正好超出长度，则舍去该汉字 最后显示结果为xxxxxx...
	 */
	adjustStr : function(str, n) {
		if (Util.byteLength(str) < n) {
			return str;
		}
		var destination = [];
		var currentLength = 0;
		for ( var i = 0, j = (str || "").length; i < j; i++) {
			var temp = str.charAt(i);
			currentLength += Util.byteLength(temp);
			if (currentLength <= n) {
				destination[i] = temp
			}
		}
		destination.push('...');
		return destination.join('');
	},
	formatDateStrToMSEC : function(dateStr) {
		if (dateStr) {
			return new Date(dateStr.replace(/-/g, "/")).getTime();
		} else {
			return 0;
		}
	},
	/**
	 * 格式化时间 第一个参数为时间 第二个参数为格式化方式 如 "yyyy-MM-dd HH:mm:ss"
	 */
	formatDate : function(date, str) {
		var df = new SimpleDateFormat();// jsJava1.0需要使用DateFormat对象，不要弄错就是了
		df.applyPattern(str);
		return str = df.format(date);
	},
	popShortPermitWindow : function() {
		
//		Util.confirm("是否去授权?",function (){
//			window.open("http://container.open.taobao.com/container?appkey=12292183&scope=r1,r2,w1,w2&fromFlag=shortPermit");
//		},null," 是 "," 否 ");
		
		Util.popWindow({
			id : "shortPermitionWin",
			title : "请授权",
			url : "/shortPermition.jsp",
			width : 850,
			height : 630,
			submitBtn : false,
			closeBtn : false
		});
	},
	closeShortPermit : function() {
		$("#shortPermitionWin").animate({
			height : 'hide'
		}, function() {
			$("#shortPermitionWin_cover").fadeOut(500, function() {
				$("#shortPermitionWin").remove();
			});
		});
	},
	/**
	 * Util.popWindow({ title: "确认关闭", url: "/test.jsp", width: 550, height: 300,
	 * submitBtn: true, submitBtnText: "保 存", closeBtn: true, closeBtnText: "关
	 * 闭", closeCallback:function(){alert(1)},
	 * submitCallback:function(){alert(2)}
	 */
	popWindow : function(popAttr) {
		if($('.pop').length == 0){
			var _winW = $(window).width(), // 获取当前窗口宽度
			_winH = $(window).height(), // 获取当前窗口高度
			_posiLeft = (_winW - popAttr.width) / 2;
			
			if (!popAttr.id) {
				popAttr.id = "popWindowId_" + new Date().getTime();
			}
			var submit = function() {
				if (popAttr.submitCallback) {
					popAttr.submitCallback();
				}
				close();
			};
			var close = function() {
				$popBor.removeClass('fadein').animate({
					opacity : '0'
				}, 300, function() {
					$("#" + popAttr.id + "_cover").fadeOut(300, function() {
						$(this).remove();
						$("#" + popAttr.id).remove();
						$("html").attr("style", "");
					});
				});
			};
			if (!popAttr.height) {//定义高度
				/*浏览器当前窗口可视区域高度 - 窗口top高度 - 弹出框标题高度 - 上下边框高度
			 popAttr.height = $(window).height() - popPos()._posiTop - 45 - 35; */
				popAttr.height = "auto";
			}
			var popContainerId = popAttr.id + "_container";
			var loadPage = function(callback) {		
				Util.loadPageByAjax(popContainerId, popAttr.url, callback)
			};
			var myPopCoverDom = $('<div id="' + popAttr.id + '_cover" class="pop-cover"></div>');
			var myPopDom = $('<div id="'
					+ popAttr.id
					+ '" class="pop"><div class="pop-bor"><div class="pop-box"><div class="pop-hd"><h3 class="pop-title">我的弹窗</h3><a class="pop-off" href="javascript:void(0)">×</a></div><div class="pop-bd"><div class="pop-main"><div id="'+popContainerId+'"></div></div><div class="pop-b" style="text-align: center;"></div></div></div></div>');
			if (!$("#" + popAttr.id + "_cover")[0]) {
				myPopCoverDom.appendTo("body");
			}
			$("html").css("overflow", "hidden");
			$("#" + popAttr.id + "_cover").css({
				top: 0,
				left: 0,
				right: 0,
				bottom: 0
			})
			if (!$("#" + popAttr.id)[0]) {
				myPopDom.appendTo("body");
			}
			/* 定位弹窗 ---start */
			var $popBor = $("#" + popAttr.id).children(".pop-bor");
			var popupPosition = function(){
				$popBor.css({
					width : popAttr.width + "px",
					left: _posiLeft + "px"
				});
				$popBor.height(popAttr.height).addClass('fadein');
				if(popAttr.height == 'auto'){
					$popBor.css({
						top: 0
					})
				}else if(popAttr.height > (_winH - 60)){
					$popBor.css({
						top: 0
					})
				}else if(popAttr.height <= (_winH - 60)){
					$popBor.css({
						top: (_winH - 60 - popAttr.height) / 2 + "px"
					})
				}
			}
			$("#" + popAttr.id + "_cover").fadeIn(300, popupPosition);
			/* 定位弹窗 ---end */
			
			$("#" + popAttr.id).children(".pop-box").css({
				width : popAttr.width + "px"
			});
			$("#" + popAttr.id).find(".pop-title").text(popAttr.title);
			loadPage();
			
			if (popAttr.submitBtn) {
				var submitBtnDom = $('<button class="btn btn-primary right submitBtn">' + popAttr.submitBtnText + '</button>');
				submitBtnDom.appendTo($("#" + popAttr.id).find(".pop-b"));
				$("#" + popAttr.id).find(".submitBtn").click(function() {
					submit();
				});
			}
			if (popAttr.closeBtn) {
				var closebtnDom = $('<button class="btn right closeBtn" style="margin-left: 20px;">' + popAttr.closeBtnText + '</button>');
				closebtnDom.appendTo($("#" + popAttr.id).find(".pop-b"));
				$("#" + popAttr.id).find(".closeBtn").click(function() {
					if (popAttr.closeCallback) {
						popAttr.closeCallback();
					}
					close();
				});
			}
			
			if (!popAttr.submitBtn && !popAttr.closeBtn) {
				$("#" + popAttr.id).find(".pop-b").remove();
			}
			$("#" + popAttr.id).find(".pop-off").click(function() {
				if (popAttr.closeCallback) {
					popAttr.closeCallback();
				}
				close();
			});
			
			// 定义弹窗是否可拖拽；
			if(popAttr.drag){
				var isDrag = false, popX, popY, X, Y, _x, _y, moveX, moveY;
				$("#" + popAttr.id).addClass('drag');
				$("#" + popAttr.id).find(".pop-hd").mousedown(function(e){
					popX = $("#" + popAttr.id).find(".pop-hd").offset().left;
					popY = $("#" + popAttr.id).find(".pop-hd").offset().top;
					X = e.pageX;
					Y = e.pageY;
					_x = X - popX;
					_y = Y - popY;
					isDrag = true;
				});
				$(document).mousemove(function(e){
					if(isDrag){
						X = e.pageX;
						Y = e.pageY;
						moveX = X - _x;
						moveY = Y - _y;
						maxX = X + ($popBor.width() - _x);
						maxY = Y + ($popBor.height() - _y);
						_winW = $(window).width();
						_winH = $(window).height();
						if(X >= _x && Y >= _y && maxX <= _winW && maxY <= _winH){
							$("#" + popAttr.id).find('.pop-bor').css({
								top: moveY + "px",
								left: moveX + "px"
							})
						}
					}
				}).mouseup(function(){
					isDrag = false;
				})
			}
		}
	},
	closePopWindow : function(windowId) {
		if(!windowId){
			windowId = "popWindowId";
			$("div[id^=" + windowId + "]").find(".pop-bor").removeClass('fadein').animate({
				opacity : '0'
			}, 300, function() {
				$("div[id^=" + windowId + "]").fadeOut(300, function() {
					$("div[id^=" + windowId + "]").remove();
					$("html").attr("style", "");
				});
			});
		}else{
			$("#" + windowId).find(".pop-bor").removeClass('fadein').animate({
				opacity : '0'
			}, 300, function() {
				$("#" + windowId + "_cover").fadeOut(300, function() {
					$(this).remove();
					$("#" + windowId).remove();
					$("html").attr("style", "");
				});
			});
		}
		
	},
	
	/**
	 * Util.popWindowBare({ id: "aii", url: "/test.jsp", width: 550, height:
	 * 300})
	 */
	popWindowBare : function(popAttr) {
		var _winW = $(window).width(), // 获取当前窗口宽度
			_winH = $(window).height(), // 获取当前窗口高度
			_posiLeft = (_winW - popAttr.width) / 2;
			
		var close = function() {
			$popBor.removeClass('fadein').animate({
				opacity : '0'
			}, 300, function() {
				$("#" + popAttr.id + "_cover").fadeOut(300, function() {
					$(this).remove();
					$("#" + popAttr.id).remove();
					$("html").attr("style", "");
				});
			});
		};
		if (!popAttr.id) {
			popAttr.id = "popWindowId";
		}
		//定义高度
		if (!popAttr.height) {
			popAttr.height = "auto";
		}
		
		var popContainerId = popAttr.id + "_container";
		var loadPage = function() {
			Util.loadPageByAjax(popContainerId, popAttr.url, popAttr.param)
		};
		var myPopCoverDom = $('<div id="' + popAttr.id + '_cover" class="pop-cover"></div>');
		
		var myPopDom ;
		if(popAttr.isBackgroundNone){
			myPopDom = $('<div id="'
					+ popAttr.id
					+ '" class="pop"><div class="pop-bor pop-transparent"><div class="pop-box-none"><div id="'+popContainerId+'"></div><div class="pop-b"></div></div></div>');
		}else{
			myPopDom = $('<div id="'
					+ popAttr.id
					+ '" class="pop"><div class="pop-bor"><div class="pop-box"><div><div class="pop-main"><div id="'+popContainerId+'"></div></div><div class="pop-b"></div></div></div></div>');
		}

		if (!$("#" + popAttr.id + "_cover")[0]) {
			myPopCoverDom.appendTo("body");
		}
		$("html").css("overflow", "hidden");
		$("#" + popAttr.id + "_cover").css({
			top: 0,
			left: 0,
			right: 0,
			bottom: 0
		})
		if (!$("#" + popAttr.id)[0]) {
			myPopDom.appendTo("body");
		}
		
		/* 定位弹窗 ---start */
		var $popBor = $("#" + popAttr.id).children(".pop-bor");
		var popupPosition = function(){
			$popBor.css({
				width : popAttr.width + "px",
				position: "relative",
				left: _posiLeft + "px"
			});
			$popBor.height(popAttr.height).addClass('fadein');
			if(popAttr.height == 'auto'){
				$popBor.css({
					top: 0
				})
			}else if(popAttr.height > (_winH - 60)){
				$popBor.css({
					top: 0
				})
			}else if(popAttr.height <= (_winH - 60)){
				$popBor.css({
					top: (_winH - 60 - popAttr.height) / 2 + "px"
				})
			}
		}
		$("#" + popAttr.id + "_cover").fadeIn(300, popupPosition())
		/* 定位弹窗 ---end */

		loadPage();
		if (!popAttr.submitBtn && !popAttr.closeBtn) {
			$("#" + popAttr.id).find(".pop-b").remove();
		}
		$("#" + popAttr.id).find(".pop-off").click(function() {
			if (popAttr.closeCallback) {
				popAttr.closeCallback();
			}
			close();
		});
	},
	notify : function(text) {
		if (!window.tips){
			window.tips = new showtips();
		}
		tips.show(text);
	},
	isCustomerLogin : function() {
		var returnVal = false;
		Util.ajax({
			url : "/ajax-validate!isCustomerLogin.action?" + "t_" + new Date().getTime(),
			async : false,
			type : "POST",
			dataType : 'json',
			success : function(json) {
				var res = json.status;
				if (res == 1) {
					returnVal = true;
				} else {
					returnVal = false;
				}
			}
		});
		return returnVal;
	},
	isFreeCustomer : function() {
		var returnVal = false;
		Util.ajax({
			url : "/ajax-validate!isFreeCustomer.action?" + "t_" + new Date().getTime(),
			async : false,
			type : "POST",
			dataType : 'json',
			success : function(json) {
				var res = json.status;
				if (res == 1) {
					returnVal = true;
				} else {
					returnVal = false;
				}
			}
		});
		return returnVal;
	},
	isSeniorCustomer : function() {
		var returnVal = false;
		Util.ajax({
			url : "/ajax-validate!isSeniorCustomer.action?" + "t_" + new Date().getTime(),
			async : false,
			type : "POST",
			dataType : 'json',
			success : function(json) {
				var res = json.status;
				if (res == 1) {
					returnVal = true;
				} else {
					returnVal = false;
				}
			}
		});
		return returnVal;
	},
	getCustomerVersion : function(){
		var returnVal = false;
		Util.ajax({
			url : "/ajax-validate!isSeniorCustomer.action?" + "t_" + new Date().getTime(),
			async : false,
			type : "POST",
			dataType : 'json',
			success : function(json) {
				var res = json.status;
				if (res == 1) {
					returnVal = true;
				} else {
					returnVal = false;
				}
			}
		});
		return returnVal;
	},
	isSessionKeyExpire : function(){
		var serverTime = null;
		Util.ajax({
			url : "/ajax!getCurrentDate.action?" + "t_" + new Date().getTime(),
			async : false,
			type : "POST",
			dataType : 'json',
			success : function(json) {
				var status = json.status;
				if (status == 1) {
					serverTime = json.data.serverTime;
				} 
			}
		});
		if(Util.isBlank(serverTime) || typeof(serverTime) == "undefined"){
			serverTime = new Date().getTime();
		}
		return (Number(serverTime) - Number(window.customer.sessionKeyExpireTime)) > 0;
	},
	isPromoteTaskExecuting : function() {
		var returnVal = false;
		Util.ajax({
			url : "/ajax-validate!isPromoteTaskExecuting.action?" + "t_" + new Date().getTime(),
			async : false,
			type : "POST",
			dataType : 'json',
			success : function(json) {
				var status = json.status;
				if (status == 1) {
					returnVal = true;
				} else {
					returnVal = false;
				}
			}
		});
		return returnVal;
	},
	/**
	 * 查询是否有宝贝属性出错的 true为有
	 */
	isConcelFialItemActivite : function(templateId) {
		var returnVal;
		Util.ajax({
			url : "/ajax-validate!isConcelFialItemActivite.action?templateId=" + templateId + "&t_" + new Date().getTime(),
			async : false,
			type : "POST",
			dataType : 'json',
			success : function(json) {
				var res = json.status;
				if (res == -1) {
					returnVal = true;
				} else {
					returnVal = false;
				}
			}
		});
		return returnVal;
	},
	// 验证非负数
	checkPrice : function(obj) {
		var regExp = /^\d{0,8}\.{0,1}(\d{1,2})?$/;
		if (!regExp.exec(obj.value)) {
			obj.value = '';
		}
	},
	// 验证非负整数
	checkNonzeroInteger : function(obj) {
		var regExp = /^[0-9]\d*$/;
		if (!regExp.exec(obj.value)) {
			obj.value = '';
		}
	},
	// 验证正整数
	checkPositiveInteger : function(obj) {
		var regExp = /^[1-9]\d{0,3}?$/;
		if (!regExp.exec(obj.value)) {
			obj.value = '';
		}
	},
	checkDiscount : function(obj) {
		var regExp = /^[1-9](\.[1-9])?|0\.[1-9]$/;
		if (!regExp.exec(obj.value)) {
			obj.value = '';
		}
	},
	refreshProgressBar : function() {
		$(".progressBar").each(
				function() {
					var total = $(this).attr("data-total");
					var current = $(this).attr("data-current");
					var percent = current / total * 100;
					var progressBar = $('<div class="progress" style="margin-bottom: 9px;"><div class="bar" style="width: ' + percent
							+ '%"></div></div>');
					$(this).html(progressBar);
				});
	},
	loadingPage : function(status) {
		if (!window.ld){
			window.ld = new Loading('body');
		}
		if (!!status) {
			ld.init();
		} else {
			ld.destory();
		}
	},
	track : function(trackId) {
		if (trackId) {
			Util.ajax({
				url : "/ajax!doTrack.action?isNewVersion=1&trackId=" + trackId + "&t_" + new Date().getTime(),
				async : true,
				type : "POST",
				dataType : 'json'
			});
		}
	},
	addFavorite : function(sURL, sTitle) {
		try {
			window.external.addFavorite(sURL, sTitle);
		} catch (e) {
			try {
				window.sidebar.addPanel(sTitle, sURL, "");
			} catch (e) {
				alert("加入收藏失败，请使用Ctrl+D进行添加");
			}
		}
	},
	loadSmsSpareCount : function(smsSpareCountContainerId) {
		Util.ajax({
			url : "/ajax!getSmsSpareCount.action?t=" + new Date().getTime(),
			async : true,
			type : "POST",
			dataType : 'json',
			beforeSend : function() {
				$("#" + smsSpareCountContainerId).html($("<img src='/assets/imgs/loading.gif' style='height:15px;margin-bottom:1px;'/>"));
			},
			success : function(json) {
				$("#" + smsSpareCountContainerId).html(json.smsSpareCount);
			}
		});
	},
	getSmsSpareCount : function() {
		var smsSpareCount = 0;
		Util.ajax({
			url : "/ajax!getSmsSpareCount.action?t=" + new Date().getTime(),
			async : false,
			type : "POST",
			dataType : 'json',
			success : function(json) {
				smsSpareCount = json.smsSpareCount;
			}
		});
		return smsSpareCount;
	},
	loadSellerSpareDays : function(){
		$(".sellerSpareDays").html(customer.spareDay);
	},
	getSellerSpareDays : function() {
		return customer.spareDay;
	},
	releaseDone : function(templateId) {
		if (templateId) {
			var url = "/v2014/common/redirect!toShare.action?templateId=" + templateId + "&shareType=1";
			Util.loadPageByAjax("rightContent", url);
		}
	},
	toShare : function(templateId) {
		var url = "/v2014/common/redirect!toShare.action?templateId=" + templateId;
		var title = "分享";
		var popAttr = {
			id : "toShare",
			title : title,
			url : url,
			width : 800,
			height : 400,
			submitBtn : false,
			closeBtn : false
		};
		Util.popWindow(popAttr);
	},
	arrayToStr : function(array) {
		var arrayStr = "";
		if (array) {
			for ( var index in array) {
				arrayStr = arrayStr + array[index] + ","
			}
		}
		return arrayStr;
	},
	ajax : function(option){
		var successFunction = option.success;
		var overrideSuccessFunc = function(json){
			if (json.status == 2){
				Util.notify("授权过期，请重新授权！");
				Util.popShortPermitWindow();
				return;
			}
			successFunction(json);
		};
		option.success = overrideSuccessFunc;
		
		var submitObj = option.submitObj;
		if(submitObj){// lg
			var htmlContent = submitObj.html();
			option.beforeSend = function(){
				submitObj.html("提交中...");
				Util.loadingPage(1);
			}
			option.complete = function() {
				submitObj.html(htmlContent);
				Util.loadingPage(0);
			}
		}
		$.ajax(option);
	},
	inspectDiscountLimit : function(isNeedUpdate) {
		var returnVal;
		var requestUrl;
		if (isNeedUpdate){
			requestUrl = "/activity/activity!inspectDiscountLimit.action?updateDiscountLimit=true&t="+new Date().getTime();
		}else{
			requestUrl = "/activity/activity!inspectDiscountLimit.action?t="+new Date().getTime();
		}
		Util.ajax({
			type : "POST",
			dataType : "json",
			url : requestUrl,
			async : false,
			success : function(json){
				if (json.status == 1){
					var discountLimit = json.data.discountLimit;
					returnVal = discountLimit;
				}
			}
		});
		return returnVal;
	},
	toTop : function() {
		document.body.scrollLeft = 0;
		document.body.scrollTop = 0;
	},
	popMarketing : function(versions){
		Operation.popUpgradeInInner(versions);
	},
	popRenewalForSenior : function(){
		popAttr = 
		{
			id : "lowest",
			title : "升级/续费",
			url : "/2014/common/pop_marketing.jsp?versions=senior",
			width : 788,
			submitBtn : false,
			closeBtn : false
		};
		Util.popWindow(popAttr);
	},
	isNeedRenewal : function(){
		var returnVal;
		Util.ajax({
			url : "/ajax!isNeedRenewal.action?t=" + new Date().getTime(),
			async : true,
			type : "POST",
			dataType : 'json',
			success : function(json) {
				returnVal = json.status;
			}
		});
		return Number(returnVal);
	},
	isNeedUpgrade : function(){
		var returnVal;
		Util.ajax({
			url : "/ajax!isNeedUpgrade.action?t=" + new Date().getTime(),
			async : false,
			type : "POST",
			dataType : 'json',
			success : function(json) {
				returnVal = json.status;
			}
		});
		return Number(returnVal);
	},
	popRenewal : function(){
		var popAttr = 
		{
			id : "renewal",
			title : "续费弹窗",
			url : "/common/renewal.jsp",
			width : 775
		};
		Util.popWindowBare(popAttr); 
	},
	popWireless : function(){
		var popAttr = 
		{
			id : "wireless",
			title : "无线营销弹窗",
			url : "/common/wireless.jsp",
			width : 770
		};
		Util.popWindowBare(popAttr); 
	},
	popMarketing_for41 : function(){
		var popAttr = 
		{
			id : "act41",
			title : "",
			url : "/common/pop_marketing_for41.jsp",
			width : 765
		};
		Util.popWindowBare(popAttr); 
	},
	isNeedFor51 : function(){
		var returnVal;
		Util.ajax({
			url : "/ajax!isNeedFor51.action?t=" + new Date().getTime(),
			async : false,
			type : "POST",
			dataType : 'json',
			success : function(json) {
				returnVal = json.status;
			}
		});
		return Number(returnVal);
	},
	popMarketing_for51 : function(){
		var popAttr = 
		{
			id : "act41",
			title : "",
			url : "/common/pop_marketing_for51.jsp",
			width : 765
		};
		Util.popWindowBare(popAttr); 
	},
	setCookie : function(key,value,days)
	{
	    var Days = 90; // 此 cookie 将被保存90 天
	    if(days){
	    	Days = days;
	    }
	    var exp  = new Date();    // new Date("December 31, 9998");
	    exp.setTime(exp.getTime() + Days*24*60*60*1000);
	    document.cookie = encodeURI(key) + "="+ encodeURI(value) + ";expires=" + exp.toGMTString() + "; path=/";

	},
	delCookie : function(key)
	{
	    var exp = new Date();
	    exp.setTime(exp.getTime() - 1);
	    var cval = Util.getCookie(key);
	    if(cval != null) document.cookie= encodeURI(key) + "="+encodeURI(cval)+";expires="+exp.toGMTString();
	},
	getCookie : function(key)
	{
		key = encodeURI(key);
		var value;
		var allcookies = document.cookie;
		var cookie_pos = allcookies.indexOf(key);

		// 如果找到了索引，就代表cookie存在，
		// 反之，就说明不存在。
		if (cookie_pos != -1)
		{
			// 把cookie_pos放在值的开始，只要给值加1即可。
			cookie_pos += key.length + 1;
			var cookie_end = allcookies.indexOf(";", cookie_pos);
	
			if (cookie_end == -1)
			{
				cookie_end = allcookies.length;
			}
			value = decodeURI(allcookies.substring(cookie_pos, cookie_end));
		}
		return value;
	},
	closePromotManaul:function(thiz){
		var name = $(thiz).attr("pmkey");
		if(!name){
			name = thiz;
		}
		$.post("/ajax!closePromotManaul.action?t="+(new Date()).getTime(),{"pmkey":name},function(json){
			if(json.status==1){
				$(thiz).parent(".msg").hide();
			}else{
				Util.notifyError("系统繁忙，请稍后再试！");
			}
		},"json");
	},
	getCidItemCount : function(cids,async){
		if(Util.isBlank(cids)){
			return 0;
		}
		if(typeof async == "undefined"){			
			async = true;
		}
		var count = 0;
		Util.ajax({
			  url: "/ajax!getSellerCidsCount.action?"+  "t_" + new Date().getTime(),
			  async: async,
			  dataType:"json",
			  data:{"sellerCids":cids.toString()},
			  success: function(json){
				  count = json.message
				 }
			});
		return count;
	},
	/**
	 * 设置分页显示栏 0/150 展示方式
	 * 
	 * @param thiz
	 * @param itemSize
	 */
	setCurrentPageSize : function(thiz,itemSize){
		$(thiz).html("<span style='color:#22a4ff'>"+itemSize+"</span>");
	},
	/**
	 * 最低折扣的弹窗
	 */
	lowestDiscountPop : function(){
		var url = "/2014/common/lowestDiscount.jsp";
		var title = "信息";
		var popAttr = 
		{
			id : "lowest",
			title : title,
			url : url,
			width : 400,
			height : 600,
			submitBtn : false,
			closeBtn : false
		};
		Util.popWindow(popAttr);
		$("#submitLoading").hide();
		$("#submitButton").show();
	},
	/**
	 * 停止按钮确认框动作 content : 对话框内容 confirmFun : 确认按钮的回调函数 backFun : 返回按钮的回调函数
	 * confirmContent : 确认按钮的内容,默认为"确认" backContent : 返回按钮的内容,默认为"返回"
	 */
	confirm : function(content,confirmFun,backFun,confirmContent,backContent){
		var m = "ccadd";
		var model = {
				ccadd:ccaddModel
			}
		var r=/\/\*([\S\s]*?)\*\//m,
		m=r.exec(model[m].toString());
		model = m&&m[1]||m;
		$('body').append(model);
		
		if(!content){
			content = "无设置content内容";
		}
		if(!confirmContent){
			confirmContent = "确定";
		}
		if(!backContent){
			backContent = "返回";
		}

		$('.ccmodel-title p').html(content);
		$('.ccmodel-confirm-btn').html(confirmContent);
		$('.ccmodel-back-btn').html(backContent);

		$('.ccmodel-box-model').on('click',function(){
			$('.ccmodel-box').remove();
	  		$('.ccmodel-box-model').remove();
		});

		$('.ccmodel-back-btn').on('click',function(){
			if(typeof backFun == "function"){
				backFun();
			}
			$('.ccmodel-box').remove();
	  		$('.ccmodel-box-model').remove();
		});

		$('.ccmodel-confirm-btn').on('click',function(){
			if(typeof confirmFun == "function"){
				confirmFun();
			}
			$('.ccmodel-box').remove();
	  		$('.ccmodel-box-model').remove();
		});
	},
	stopDefault : function(e) { 
	     if (e && e.preventDefault) {
	    	 e.preventDefault(); 
	    	 e.stopPropagation();
    	 }else {
    		 window.event.returnValue = false; 
    		 window.event.cancelBubble=true;
    	 }
	    return false; 
	},
	switchVersion : function(version){
		Util.ajax({
			url : "/ajax!switchVersion.action?version=" + version + "&t=" + new Date().getTime(),
			async : false,
			type : "POST",
			dataType : 'json',
			success : function(json) {
				if (json.status == 1){
					window.location.href = "http://yingxiao.baobeituan.com";
				}
			}
		});
	},
	isFreshCustomer : function(){
		//isNewVersion = 0 旧版  ;isNewVersion=1 新旧 ;isNewVersion=2 新;
		if (window.customer.isNewVersion == 1 || window.customer.isNewVersion == 0){
			return true;
		}else{
			return false;
		}
	},
	initIntroduce : function(){
		var currentUrl = String(window.location);
		//老用户使用指南  
		if (Util.isFreshCustomer()){
			if (currentUrl.indexOf("baobeituan.com/index") != -1){
				window.onload = new function(){introStart();}
			}else if (currentUrl.indexOf("baobeituan.com/activity/") != -1){
				if (currentUrl.indexOf("/activity/index") != -1){
					window.onload = new function(){introActivity();}
				} else if (currentUrl.indexOf("/activity/discount") != -1){
					window.onload = new function(){introDiscount();}
				}
			}else if (currentUrl.indexOf("baobeituan.com/template/") != -1){
				if (currentUrl.indexOf("/template/templateCenter") != -1){
					window.onload = new function(){introTemplateCenter();}
				} else if (currentUrl.indexOf("/template/myCollection") != -1){
					window.onload = new function(){introCollection();}
				}
			}else if (currentUrl.indexOf("baobeituan.com/mobile") != -1){
				if (currentUrl.indexOf("/mobile/index") != -1){
					window.onload = new function(){introMobile();}
				}
			}else if (currentUrl.indexOf("/promotion/member") != -1){
				if (currentUrl.indexOf("/promotion/member/care/autoSet") != -1){
					window.onload = new function(){introCRM();}
				}
			}
		}else{//新用户使用指南
			if (currentUrl.indexOf("baobeituan.com/index") != -1){
				window.onload = new function(){newIntroStart();}
			}else if (currentUrl.indexOf("baobeituan.com/activity/") != -1){
				if (currentUrl.indexOf("/activity/index") != -1){
						window.onload = new function(){newIntroActivity();}
				} else if (currentUrl.indexOf("/activity/discount/create") != -1){
						window.onload = new function(){newIntroDiscount();}
				} 
			}
		}
	}
	
}
