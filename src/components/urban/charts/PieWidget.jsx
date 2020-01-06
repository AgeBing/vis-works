import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import '../index.css';

import { Divider } from 'antd';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";


function generateRandomData(){
  const carTypes = ['私家车','客车','货车']
  const data = []
  let last = 100
  for(let i=carTypes.length-1; i >= 0;i--){
     let value
     if(i != 0){
        value = Math.ceil(Math.random() * 50)
        last -= value
     }else{
        value = last
     }
     data.push({
       'type': carTypes[i],
       'percent': value
     })
  }
  console.log(data)
  return data
}


const cols = {
  percent: {
    formatter: val => (val = `${val}%`),
  },
};
class FlowWidget extends React.Component {

  constructor(props){
    super(props)
    this.state = {
    }
  }

  componentWillMount(){}

  render(){
    return (
    <div style={{'position' : 'relative'}}>       
        <Divider orientation="left"> 通行车辆类型比例 </Divider>
        <Chart
          height={400}
          padding={[ 20, 0, 20, 0 ]} 
          data={generateRandomData()}
          scale={cols}
          onGetG2Instance={(chart) => {
            // 饼图绘制多次会导致setSelected处理不生效，延时hack一下fixed
            setTimeout(() => {
              // 设置默认选中
              // const geom = chart.get('geoms')[0]; // 获取所有的图形
              // console.log(geom);
              // const items = geom.get('data'); // 获取图形对应的数据
              // console.log(JSON.stringify(items));
              // geom.setSelected(items[1]);
            }, 2000);
          }} // 设置选中
          onPlotClick={(ev) => {
            console.log(ev);
          }}
          style={{
            'position' : 'absolute',
            'left': '20px',
            'top': '-30px'
          }}
        >
          <Coord type="theta" radius={0.65} />
          <Axis name="percent" />
          <Tooltip
            showTitle={false}
            itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
          />
          <Legend
            position="right"
            offsetY={-130}
            offsetX={-90}
          />
          <Geom
            type="intervalStack"
            position="percent"
            color={["type", ["#FF5900","#F58A00","#FFB703"]]}
            tooltip={[
              'type*percent',
              (item, percent) => {
                percent = `${percent}%`;
                return {
                  name: item,
                  value: percent,
                };
              },
            ]}
            style={{
              lineWidth: 1,
              stroke: '#fff',
            }}
          />
        </Chart>
    </div>
  )}
}

export default FlowWidget;
