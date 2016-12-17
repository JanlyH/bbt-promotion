	function ccaddModel(){
		/*
			<div class="ccmodel-box">
				<div class="ccmodel-title">
					<p></p>
				</div>
				<div class="ccmodel-btn">
					<a href="javascript:;" class="ccmodel-back-btn"></a>
					<a href="javascript:;" class="ccmodel-confirm-btn"></a>
				</div>
			</div>
			<div class="ccmodel-box-model"></div>
		*/
	}


	var model = {
		ccadd:ccaddModel
	}

  	
  	function ccdiagle(options){
  			var model = getmodel("ccadd");
  			$('body').append(model);
  			var content,confirm,back,confirmFun,gobackFun;
  			/*
				content : 对话框内容
				confirm : 确认按钮的内容,默认为"确认"
				back : 返回按钮的内容,默认为"返回"
				confirmbackFun : 确认按钮的回调函数
				gobackFun : 返回按钮的回调函数
  			*/
  			try{ content = options.content ? options.content : "无设置content内容";}//送货地址
  			catch(e){ content = "无设置content内容";}//送货地址

  			try{ confirm = options.confirm ? options.confirm : "确定";}//送货地址	
			catch(e){ confirm = "确定";}
				
			try{ back = options.back ? options.back : "返回";}//送货地址	
			catch(e){ back = "返回";}

			try{ confirmFun = options.confirmFun }//送货地址	
			catch(e){}

			try{ gobackFun = options.gobackFun }//送货地址	
			catch(e){}


  			$('.ccmodel-title p').html(content);
  			$('.ccmodel-confirm-btn').html(confirm);
  			$('.ccmodel-back-btn').html(back);

  			$('.ccmodel-box-model').on('click',function(){
  				destoryModel();
  			});

  			$('.ccmodel-back-btn').on('click',function(){
  				$.isFunction(gobackFun) && gobackFun();
  				destoryModel();
  			});

  			$('.ccmodel-confirm-btn').on('click',function(){
  				$.isFunction(confirmFun) && confirmFun();
				destoryModel();
  			});
  		}
  	

  	function destoryModel(){
  		$('.ccmodel-box').remove();
  		$('.ccmodel-box-model').remove();
  	}


  	function getmodel(m){
  		var r=/\/\*([\S\s]*?)\*\//m,
		m=r.exec(model[m].toString());
		return m&&m[1]||m;
  	}