

var discountSet = function(){
	
}


discountSet.prototype.init = function(){
	var dismo = getmodel('discountSet');
	$('.container-content-frame').append(dismo);

	this.addEvent();
}

discountSet.prototype.addEvent = function(){
	var _this = this;
	var ld = new Loading('.container-content-frame');
	ld.destory();

	
	


	

}

discountSet.prototype.destory = function(){
	$('.prodise-cbox').remove();
}



var disinfo = function(){

}

disinfo.prototype.init = function(){
	var dismo = getmodel('disInfo');
	$('.container-content-frame').append(dismo);
	this.addEvent();
}


disinfo.prototype.addEvent = function(){
	var _this = this;
	
	
}

disinfo.prototype.destory = function(){
	$('.prodise-disinfo-box').remove();
}