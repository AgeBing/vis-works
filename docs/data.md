

## 坐标系
原数据地理坐标采用 `WGS84 地球坐标系`  
高德地图坐标系采用 `GCJ-02 火星坐标系`  

- 参考 
	- [其他坐标转高德坐标](https://lbs.amap.com/api/javascript-api/guide/transform/convertfrom)
	- https://github.com/wandergis/coordTransform_py  
	`python coord_converter.py -i center_wgs.csv -o center_gcj02.csv -t w2g -n longitude -a latitude`


## 卡口数据
`kakou.csv`

#### 存在问题
- 数据ID重复 

#### 预处理
- 将市区外围的点筛选掉
- 构造邻近卡口点（为了展示好看）

## 轨迹数据
`trajs_{timeSlot}.csv`

#### 存在问题
- 记录重复
- 记录空缺
- 记录偏移

#### 预处理
- 按照路网结构进行过滤



#### 优化
采用 `Rtree` 加速计算邻近卡口点. 来自[data-analysis-in-python · GIS in Python](http://www.data-analysis-in-python.org/t_gis.html)