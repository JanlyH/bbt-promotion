function guidance(){
	var bodyH = $('body').height();
	var mask = $('<div>').addClass('guidance-mask').height(bodyH);
	var step1 = $('<div>').addClass('step1').css({
		'display':'none',
		'position':'absolute',
		'background-image':'url("https://img.alicdn.com/imgextra/i3/17157061/TB2VNgkjFXXXXbHXpXXXXXXXXXX-17157061.png")',
		'z-index':'999999',
		'width':'808px',
		'height':'597px',
		'left':'50%',
		'top':'50%',
		'margin-left':'-404px',
		'margin-top':'-298px'
	});
	var gobbt = $('<a href="#" class="gobbt" style="position: relative; display: inline-block; width: 343px; height: 62px; top: 405px; left: 235px;">');
	var next = 
	$('body').append(mask, step1);
	$('.step1').show().append(gobbt);
}
guidance()