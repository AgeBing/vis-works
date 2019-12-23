

export const GDP = {
	Ningbo : [
		{'district':'鄞州区','value':1513.91},
		{'district':'慈溪市','value':1487.75},
		{'district':'北仑区','value':1405.50},
		{'district':'海曙区','value':1164.50},
		{'district':'余姚市','value':1023.23},
		{'district':'镇海区','value':908.70},
		{'district':'奉化区','value':549.93},
		{'district':'宁海县','value':542.20},
		{'district':'象山县','value':498.91},
		{'district':'江北区','value':441.40}
	],
	Zhejiang: [
		{'district':'杭州','value' :12556.2},
		{'district':'宁波','value' :9846.9},
		{'district':'温州','value' :5453.2},
		{'district':'绍兴','value' :5108.0},
		{'district':'台州','value' :4388.2},
		{'district':'嘉兴','value' :4355.2},
		{'district':'金华','value' :3870.2},
		{'district':'湖州','value' :2476.1},
		{'district':'衢州','value' :1380.0},
		{'district':'丽水','value' :1298.2},
		{'district':'舟山','value' :1219.0}
	]
}

const GDPAnnualOrigin = {
    Zhejiang: {
        year: [2017, 2016, 2015, 2014, 2013],
        gdp: [51768.26, 47251.36, 42886.49, 40173.03, 37756.59],
        '第三产业': [1933.92, 1965.18, 1832.91, 1777.18, 1760.34],
        '第二产业': [22232.08, 21194.61, 19711.67, 19175.06, 18047.52],
        '第一产业': [27602.26, 24091.57, 21341.91, 19220.79, 17948.72],
        rate: [9.56, 10.18, 6.75, 6.40, 8.92],
    },
    Ningbo: {
        year: [2017, 2016, 2015, 2014, 2013],
        gdp: [9842.10, 8686.49, 8003.61, 7610.28, 7128.87],
        '第三产业': [305.80, 302.06, 284.68, 275.70, 276.35],
        '第二产业': [5119.40, 4455.34, 4098.22, 3980.41, 3741.72],
        '第一产业': [4416.80, 3929.10, 3620.71, 3354.17, 3110.80],
        rate: [13.30, 8.53, 5.17, 6.75, 8.31],
    },
}

export const GDPAnnual = {
	Zhejiang : [],
    ZhejiangRate:[],
    Ningbo :[],
    NingboRate:[]
}

const types = ['第一产业','第二产业','第三产业']
const regions = ['Zhejiang','Ningbo']
let y,
	t,
	v,
	region
for(let r = 0 ;r < 2;r++){
	region = regions[r]
	for(let i = 0;i < 5;i++){
		y = GDPAnnualOrigin[region]['year'][i]
		for(let j = 0;j < 3;j++){
			t = types[j]
			v = GDPAnnualOrigin[region][t][i]
			GDPAnnual[region].push({
				'year':y,
				'type':t,
				'value':v,
				'rate' : GDPAnnualOrigin[region]['rate'][i]
			})
		}
		GDPAnnual[region+'Rate'].push({
			'year':y,
			'value': GDPAnnualOrigin[region]['rate'][i]
		})
	}
}
