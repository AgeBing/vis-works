import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './index.css';

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

import { Divider } from 'antd';

function generateRandomData(){
  const data = []
  const carTypes = ['私家车','客车','货车']
  for(let t=2;t>=0;t--){
    for(let i=0;i<24;i++){
    data.push({
       'hour' : ''+i,
       'amount' : Math.ceil(Math.random()*1000),
       'type' : carTypes[t]
      })
    }
  }
  // console.log(data)
  return data
}

class FlowWidget extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
    }
  }

  componentWillMount(){

  }

  render(){
  return (
    <div>       
        <Divider orientation="left"> 交通流量 </Divider>
        <Chart  padding={[ 20, 50, 60, 50 ]} height={300} data={generateRandomData()} forceFit>
          <Legend />
          <Axis name="hour" />
          <Axis
            name="amount"
            label={{
              formatter: val => `${val}辆`
            }}
          />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="line"
            position="hour*amount"
            size={2}
            color={["type", ["#FF5900","#F58A00","#FFB703"]]}
            shape={"smooth"}
            animate={{
                appear: {
                  animation: 'fadeIn',
                  easing: 'easeElasticIn',
                  duration: 3000
                },
            }}
          />
        </Chart>
    </div>
  )}
}

export default FlowWidget;
