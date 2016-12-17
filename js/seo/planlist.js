;(function(){
	var adjustWeek = document.getElementById('adjust-week'),
				adjustTime = document.getElementById('adjust-time'),
				adjustWeekChart = echarts.init(adjustWeek),
				adjustTimeChart = echarts.init(adjustTime);

	// 调整前图表配置
	var	adjustWeekOption = {
		title: {
            text: '下架时间星期分布',
            x: "center",
            bottom: 0,
            textStyle: {	
	            fontWeight: 100,
	            fontSize: 16
            }
        },
        tooltip: {},
        legend: {
            data:['调整前后一周对比']
        },
        xAxis: {
            data: ["周一","周二","周三","周四","周五","周六", "周日"]
        },
        yAxis: [                  //y坐标的数据
        	 {
	            type: 'value',
	            name: '流量',   
	            min: 0,
	            max: 30,
	            interval: 10,    //幅度
	            axisLabel: {
	                formatter: '{value}' //单位
	            }
	        }
        ],
        series: [{
            name: '调整前后一周对比',
            type: 'bar',
            data: [5, 20, 16, 10, 10, 20],  //这里动态获取每日的值
            itemStyle:{
                normal:{color:'#28abe2'}
            }
        }]
    };

    // 调整前图表配置
	var	adjustTimeOption = {
		title: {
            text: '下架时间时段分布',
            x: "center",
            bottom: 0,
            textStyle: {	
	            fontWeight: 100,
	            fontSize: 16
            }
        },
        tooltip: {},
        legend: {
            data:['调整前后时间对比']
        },
        xAxis: {
            data: ["00:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00", "05:00-06:00", "06:00-07:00", "07:00-08:00", "08:00-09:00", "09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00", "16:00-17:00", "17:00-18:00", "18:00-19:00", "19:00-20:00", "20:00-21:00", "21:00-22:00", "22:00-23:00", "23:00-24:00"]
        },
        yAxis: [                  //y坐标的数据
        	 {
	            type: 'value',
	            name: '流量',   
	            min: 0,
	            max: 30,
	            interval: 10,    //幅度
	            axisLabel: {
	                formatter: '{value}' //单位
	            }
	        }
        ],
        series: [{
            name: '调整前后时间对比',
            type: 'bar',
            data: [5, 20, 16, 10, 10, 20, 5, 20, 16, 10, 10, 20, 5, 20, 16, 10, 10, 20, 5, 20, 16, 10, 10, 20],  //这里动态获取每个时段的值
            itemStyle:{
                normal:{color:'#28abe2'}
            }
        }]
    };

	adjustWeekChart.setOption(adjustWeekOption);
	adjustTimeChart.setOption(adjustTimeOption);
})();