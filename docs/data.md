# 1. 城市数据

## 1.1 坐标系
原数据地理坐标采用 `WGS84 地球坐标系`  
高德地图坐标系采用 `GCJ-02 火星坐标系`  

- 参考 
	- [其他坐标转高德坐标](https://lbs.amap.com/api/javascript-api/guide/transform/convertfrom)
	- https://github.com/wandergis/coordTransform_py  
	`python coord_converter.py -i center_wgs.csv -o center_gcj02.csv -t w2g -n longitude -a latitude`

## 1.2 卡口数据
`kakou.csv`

#### 数据格式
```csv
I_ID,DIRECTION_INDEX,C_NAME,longitude,latitude,location
20b5e1cf8694af7a3c1ba4a87f073021,2,裕华路站前街西向东,114.48605550783516,38.03529867581054,二环内
f4dd765c12f2ef67f98f3558c282a9cd,1,南二环富强大街东向西,114.52205733059905,38.00145704130892,二环内
```
#### 存在问题
- 数据ID重复
- 经纬度坐标系转换

#### 预处理
- 将市区外围的点筛选掉
- 构造邻近卡口点（为了展示好看）

## 1.3 轨迹数据
`trajs_{timeSlot}.csv`

#### 数据格式
```csv
startKakouId,endKakouId
25daeb9b3072e9c53f66a2196a92a011,cd10c7f376188a4a2ca3e8fea2c03aeb
```
#### 存在问题
- 记录重复
- 记录空缺
- 记录**偏移**

#### 预处理
- 按照路网结构进行过滤

#### 处理思路
1. 按照车牌分组
2. 时间片 10min  ，生成各**时间点**各车辆的**位置**（近似卡口位置）。
3. `m1.csv` , `m2.csv` , `m3.csv` =>  `m1 -> m2 -> m3` 

```
10.csv  // 00:00~00:10 间车辆最后的位置
plate , kakouId

20.csv  // 00:10~00:20 间车辆的最后位置 （找不到就取前面的位置）
plate , kakouId
```
#### 优化
采用 `Rtree` 加速计算邻近卡口点. 参考[data-analysis-in-python · GIS in Python](http://www.data-analysis-in-python.org/t_gis.html)