$('#evaluated a').click(function(e) {
	e.preventDefault()
	$(this).tab('show')
})

/**
 *@timestap 2015-11-16
 *@描述 : 选择活动开始时间
 *@功能 : 
 */

$('#pro-start-day').bind('click', function() {
	pclndrInit({
		top: '40px',
		dateele: '#pro-start-day',
		success: function(date) {
			//data返回的是当前选择的时间
			var dd = new Date(date).getTime();
			var endtime = $('#pro-end-day span').html();
			if (endtime != "") {
				endtime = new Date(endtime).getTime();
				if (dd > endtime) {
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

$('#pro-end-day').bind('click', function() {
	pclndrInit({
		top: '40px',
		dateele: '#pro-end-day',
		success: function(date) {
			//data返回的是当前选择的时间
			var dd = new Date(date).getTime();
			var endtime = $('#pro-start-day span').html();
			if (endtime != "") {
				endtime = new Date(endtime).getTime();
				if (dd < endtime) {
					tips.show('结束时间不能小于开始时间');
					$('#pro-end-day span').html('');
				}
			}
		}
	});
});



/**
 *@timestap 2015-11-16
 *@描述 : 全选按钮事件
 *@功能 : 
 */

(function() {
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
})();

// 编辑评价模版

$(document).on('click','a.evaluate-edit',function(){
	if ($(this).hasClass('btn-primary')) {
		$(this).removeClass('btn-primary').addClass('btn-info').text('保存');
		var text = $(this).prev().prev().text();
		var inputText = '<input type="text" class="form-control inline-block" autocomplete="off" style="width: 70%;">';
		$(this).prev().prev().remove();
		$(this).prev().before(inputText);
		$(this).prev().prev().val(text);
	}else{
		$(this).removeClass('btn-info').addClass('btn-primary').text('编辑');
		var val = $(this).prev().prev().val();
		var span = '<span></span>';
		$(this).prev().prev().remove();
		$(this).prev().before(span);
		$(this).prev().prev().text(val);
	};
});

// 删除评价模版

$(document).on('click','a.evaluate-del',function(){
	$(this).parent().remove();
});

// 增加评价模版

$('.evaluate-add').click(function() {
	var newModule = '<li><input type="text" class="form-control inline-block" placeholder="请输入您的新模版内容" autocomplete="off" style="width: 70%;"><a href="javascript:;" class="btn btn-warning btn-ellipse fr mr15 evaluate-del">删除</a><a href="javascript:;" class="btn btn-info btn-ellipse fr mr15 evaluate-edit">保存</a></li>';
	$('.evaluate-modules').append(newModule);
});