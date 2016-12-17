;(function(){
	var doc = document,
		level = doc.getElementById('mb-level'),
		newly = doc.getElementById('newly-mb'),
		purchase = doc.getElementById('purchase'),
		money = doc.getElementById('money'),
		levelChart = echarts.init(level),
		newlyChart = echarts.init(newly),
		purchaseChart = echarts.init(purchase),
		moneyChart = echarts.init(money);

	// 会员等级分布配置
	var levelOption = {
		color : ['#f47564', '#4fc2b9', '#5bb1ef', '#b7a1de', '#ffbe6a'],
		title : {
	        text: '会员等级分布',
	        x:'center',
	        textStyle: {
	        	color: '#666'
	        }
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
	        data: ['店铺会员','普通会员','高级会员','VIP会员','至尊VIP会员']
	    },
	    series : [
	        {
	            name: '会员数量',
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
	            data:[
	                {value:335, name:'店铺会员'},
	                {value:310, name:'普通会员'},
	                {value:234, name:'高级会员'},
	                {value:135, name:'VIP会员'},
	                {value:1548, name:'至尊VIP会员'}
	            ],
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};
	levelChart.setOption(levelOption);

	// 新增会员趋势
	var newlyOption = {
		color : ['#f47564', '#4fc2b9', '#5bb1ef', '#b7a1de', '#ffbe6a'],
		title: {
	        text: '新增会员趋势',
	        subtext: '统计近一年数据',
	        x:'center',
	        textStyle: {
	        	color: '#666'
	        }
	    },
	    tooltip: {
	        trigger: 'axis'
	    },
	    legend: {
	    	left: 'left',
	        data:['新增会员']
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    toolbox: {
	        feature: {
	            saveAsImage: {}
	        }
	    },
	    xAxis: {
	        type: 'category',
	        boundaryGap: false,
	        data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
	    },
	    yAxis: {
	        type: 'value'
	    },
	    series: [
	        {
	            name:'新增会员',
	            type:'line',
	            stack: '总量',
	            data:[120, 132, 101, 134, 90, 230, 210, 210, 210, 210, 210, 210]
	        }
	    ]
	}
	newlyChart.setOption(newlyOption);

	// 购买次数分布
	var purchaseOption = {
		color : ['#f47564', '#4fc2b9', '#5bb1ef', '#b7a1de', '#ffbe6a'],
		title : {
	        text: '购买次数分布',
	        x:'center',
	        textStyle: {
	        	color: '#666'
	        }
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
	        data: ['1次','2-3次','4-6次','7-9次','9次以上']
	    },
	    series : [
	        {
	            name: '购买次数',
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
	            data:[
	                {value:9995, name:'1次'},
	                {value:310, name:'2-3次'},
	                {value:234, name:'4-6次'},
	                {value:135, name:'7-9次'},
	                {value:10, name:'9次以上'}
	            ],
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};
	purchaseChart.setOption(purchaseOption);

	// 购买金额分布
	var moneyOption = {
		color : ['#f47564', '#4fc2b9', '#5bb1ef', '#b7a1de', '#ffbe6a'],
		title : {
	        text: '购买金额分布',
	        x:'center',
	        textStyle: {
	        	color: '#666'
	        }
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
	        data: ['0-100元','101-200元','201-300元','301-400元','401元以上']
	    },
	    series : [
	        {
	            name: '购买次数',
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
	            data:[
	                {value:995, name:'0-100元'},
	                {value:310, name:'101-200元'},
	                {value:234, name:'201-300元'},
	                {value:135, name:'301-400元'},
	                {value:120, name:'401元以上'}
	            ],
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};
	moneyChart.setOption(moneyOption);
}());