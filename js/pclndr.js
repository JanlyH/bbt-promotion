
		
		function pclndr(){
			/*

			<div class="clndr-content">	
				<div class="clndr-title">
					<p><span></span>年 <span></span>月</p>
				    <a class="premontbtn" role="btn" href="javascript:void(0);"><img src="https://img.alicdn.com/imgextra/i3/17157061/TB2GDxLkVXXXXX5XpXXXXXXXXXX-17157061.png"/></a>
				 	<a class="nextmontbtn" role="btn" href="javascript:void(0);"><img src="https://img.alicdn.com/imgextra/i1/17157061/TB2hW0BkVXXXXbAXpXXXXXXXXXX-17157061.png"/></a>
				</div>
					<table class="clndrtable" width="100%">
						<tr>
							<th class="weakday">日</th>
							<th>一</th>
							<th>二</th>
							<th>三</th>
							<th>四</th>
							<th>五</th>
							<th class="weakday">六</th>
						<tr>
						
				
							
					</table>
			</div>
      <div class="clmodel"></div>


			*/
		}



		var model = {
			clndr:pclndr
		}


		function getmodel(m){
	  		var r=/\/\*([\S\s]*?)\*\//m,
			m=r.exec(model[m].toString());
			return m&&m[1]||m;
  		}

  	var clndrmodel = getmodel("clndr");



    function pclndrInit(config){

      var top = config.top || "0px";
      var ele = config.dateele || 'p';
      var fun = config.success || '';
      $(".clndr-content").remove();
  		$(ele).parent().append(clndrmodel);
      $('.clndr-content').css('top',top);
      $('.clmodel').bind('click',function(){
        destoryClndr();
        // $('body').unbind('click');
      });
      return pcaddEvent(new clndr(ele,fun));
		}


		function pcaddEvent(a){
        $('.premontbtn').bind('click',function(){
            var localyear = $('.clndr-title p span:eq(0)').html();
            var localmonth = $('.clndr-title p span:eq(1)').html();
            $('.clndrtable tr').not(":eq(0)").remove();
            a.setcalender(parseInt(localmonth)-1,parseInt(localyear));
            if(localmonth == 1){
                $('.clndr-title p span:eq(1)').html(12);
                $('.clndr-title p span:eq(0)').html(parseInt(localyear)-1);
            }
            var year = parseInt(a.year);
            var month = parseInt(a.month) + 1;
           
            if(localyear <= year && localmonth <= month)   $('.premontbtn').css('display','none');

        });

        $('.nextmontbtn').bind('click',function(){
            var localyear = $('.clndr-title p span:eq(0)').html();
            var localmonth = $('.clndr-title p span:eq(1)').html();
            $('.clndrtable tr').not(":eq(0)").remove();
            a.setcalender(parseInt(localmonth)+1,parseInt(localyear));
           
            if(localmonth == 12){
                $('.clndr-title p span:eq(1)').html(1);
                $('.clndr-title p span:eq(0)').html(parseInt(localyear)+1);
            }

            if(localyear >= a.year && localmonth >= a.month){
               $('.premontbtn').css('display','block');
            }
        });


    }






		function clndr(ele,fun){
      this.name = "";
  		this.year = 0;
      this.month = 0;
      this.ele = ele;
      this.fun = fun;
  		this.init();

  	}

  	clndr.prototype.init = function(){
  		var mydate = new Date();
  		var thisyear=mydate.getFullYear();
  		var thismonth=mydate.getMonth()+1;
  		var thisday=mydate.getDate();
  		this.setcalender(thismonth,thisyear);
  		this.year = thisyear;
      this.month = thismonth;
  	}

  	clndr.prototype.getDay = function(month,year){
  		var showdate = new Date(year,month,0);
  		return showdate.getDate();
  	}

  	clndr.prototype.getFirstDay = function(month,year){
  		month=month-1;
  		var d=new Date(year,month,1);
  		return d.getDay();
  	}




  	clndr.prototype.setcalender = function(month,year){
  		$('.clndr-title p span:eq(0)').html(year);
      $('.clndr-title p span:eq(1)').html(month);

     



      var day = this.getDay(month,year);
      var firstday = this.getFirstDay(month,year);

      var prevmonthdays = this.getDay(month-1,year);

      if(firstday == 0){
         var prevcount = parseInt(prevmonthdays) - 7 + 1; 
      }else{
         var prevcount = parseInt(prevmonthdays) - firstday + 1; 
      }
      
       var idate = new Date();

      var localyear=idate.getFullYear();
      var localmonth=idate.getMonth()+1;
      var localday=idate.getDate();

      if(firstday == 0) firstday = 7;

      
     
      var a = (localday+firstday)/7;
      var b = (localday+firstday)%7;



      a--;
      if(b != 0) b--;
      else b = 6;

     

    // alert(Math.ceil(a) + "||"+b);
      //if(firstday != 0)  b -=firstday; 
 

      
        
      



     
      var _html = "";
      var count=1;
      var nextmonth = 1;


      if(localyear == year && localmonth == month ){
        for(var i = 0;i<6;i++){
          var _html1 = "";
          for(var j = 0;j<7;j++){
            if( i==0){
              if(i<Math.ceil(a)){
                  if(firstday == 0){
                    _html1 += '<td></td>';
                    prevcount++;
                  }else if(j >= firstday){
                     _html1 += '<td class="recentmonth">'+count+"</td>";
                     count++;
                   }else{
                      _html1 += '<td></td>';
                      prevcount++;
                    }

              }else{


                if(firstday == 0){
                   _html1 += '<td></td>';
                    prevcount++;
                }else if(j >= firstday){
                  if(i==Math.ceil(a)){
                       if(j==b){
                        _html1 += '<td class="crmlocalday">'+count+"</td>";
                        count++;
                      }else if(j<b){
                        _html1 += '<td class="recentmonth">'+count+"</td>";
                        count++;
                      }else{
                        _html1 += '<td class="selectable">'+count+"</td>";
                        count++;
                      }
                  }else{
                       _html1 += '<td class="selectable">'+count+"</td>";
                      count++;
                  }
                }else if(j < firstday){
                  _html1 += '<td></td>';
                  prevcount++;
                }else{
                  _html1 += '<td class="selectable">'+count+"</td>";
                  count++;
                }
              }
            }else{
              if(i < Math.ceil(a)){
                   _html1 += '<td class="recentmonth">'+count+"</td>";
                   count++;
              }else if(i==Math.ceil(a)){
                    if(j==b){
                      _html1 += '<td class="crmlocalday">'+count+"</td>";
                      count++;
                    }else if(j<b){
                      _html1 += '<td class="recentmonth">'+count+"</td>";
                      count++;
                    }else{
                      if(count <= day){
                        _html1 += '<td class="selectable">'+count+"</td>";
                        count++;
                      }else{
                        _html1 += '<td class="nextmonth">'+nextmonth+'</td>';
                        nextmonth++;
                      }
                    }
              }else{
                  if(count <= day){
                    _html1 += '<td class="selectable">'+count+"</td>";
                    count++;
                  }else{
                    _html1 += '<td class="nextmonth">'+nextmonth+'</td>';
                    nextmonth++;
                  }
                }
            }

          }
          _html +="<tr>"+ _html1 +"</tr>" 

        }
      }else{

        for(var i = 0;i<6;i++){
          var _html1 = "";
          
          for(var j = 0;j<7;j++){
            if(i==0){
             
              if(firstday == 0){
                _html1 += '<td class="premonth">'+prevcount+"</td>";
                prevcount++;
              }else if(j == firstday){
                _html1 += '<td class="selectable">'+count+"</td>";
                count++;
              }else if(j < firstday){
                _html1 += '<td class="premonth">'+prevcount+"</td>";
                prevcount++;
              }else{
                _html1 += '<td class="selectable">'+count+"</td>";
                count++;
              }

            }else{
              if(count <= day){
                _html1 += '<td class="selectable">'+count+"</td>";
                count++;
              }else{
                _html1 += '<td class="nextmonth">'+nextmonth+'</td>';
                nextmonth++;
              }
              
            }

          }
          _html +="<tr>"+ _html1 +"</tr>" 

       }
    }
    $('.clndrtable').append(_html);
    var tadaynum = $('.clndrtable .crmlocalday').html();
    $('.clndrtable .crmlocalday').html('今天').attr('data_day',tadaynum);

    var tomorrow = $('.clndrtable .crmlocalday').next();

 	var aftertomorrow = tomorrow.next();
     
 	var tomorrownum,aftertomorrownum;

    if(!tomorrow.length && !aftertomorrow.length){  //今天在星期六里面
    	var tom = $('.clndrtable .crmlocalday').parent().next().find('td');
		tomorrownum = tom.eq(0).html();
		aftertomorrownum = tom.eq(1).html();
    	tom.eq(0).html('明天').attr('data_day',tomorrownum);
    	tom.eq(1).html('后天').attr('data_day',aftertomorrownum);
    }else if(tomorrow.length && !aftertomorrow.length){ //今天在星期五哪里
    	var tom = $('.clndrtable .crmlocalday').parent().next().find('td');
		tomorrownum = $('.clndrtable .crmlocalday').next().html();
		aftertomorrownum = tom.eq(0).html();
    	$('.clndrtable .crmlocalday').next().html('明天').attr('data_day',tomorrownum);
    	tom.eq(0).html('后天').attr('data_day',aftertomorrownum);
    }else{
    	tomorrownum = tomorrow.html();
    	aftertomorrownum = aftertomorrow.html();
    	tomorrow.html('明天').attr('data_day',tomorrownum);
    	aftertomorrow.html('后天').attr('data_day',aftertomorrownum);
    }
    
    //改颜色
   


      
      tableEvent(this);
  	}


  	function tableEvent(_this){
  	    $('.selectable').bind('click',function(){
            setTime(this,0,_this);
        });

        $('.crmlocalday').bind('click',function(){
           setTime(this,0,_this);
        });
        $('.nextmonth').bind('click',function(){
           setTime(this,1,_this);
        });

        $('.premonth').bind('click',function(){
           setTime(this,2,_this);
        });
  	}

  	function setTime(_this,status,clndrEle){
  		$('.selectable').css({background : "#fff",color : "#333"});
  		$('.crmlocalday').css({background : "#fff",color : "#43b000"});
  		$('.nextmonth').css({background : "#fff",color : "#dadedf"});
  		$('.premonth').css({background : "#fff",color : "#dadedf"});

        $(_this).css({background : "#4fb400",color : "#fff"});
  		
  		var year = $('.clndr-title p span:eq(0)').html();
        var month = $('.clndr-title p span:eq(1)').html();
        var day_val = $(_this).html();
        var day;
        if(parseInt(day_val)){
        	day = day_val;
        }else{
        	day = $(_this).attr('data_day');
        }

        var curyear = parseInt(year);
        var curmonth = parseInt(month);
       
        if(status == 1){
          if(curmonth == 12){
            curyear++;
            curmonth = 1;
          }else{
            curmonth++;
          }
        }else if(status == 2){
          if(parseInt(month) == 1){
            curyear--;
            curmonth = 12;
          }else{
            curmonth--;
          }
        }



       	var date = curyear+"-"+curmonth+"-"+day;
        $(clndrEle.ele).find('span').html(date);
        $.isFunction(clndrEle.fun) && clndrEle.fun(date);
        destoryClndr();
  	}

  	function destoryClndr(){
      $(".clndr-content").remove();
  		$(".clmodel").remove();
  			
  		

  	}


