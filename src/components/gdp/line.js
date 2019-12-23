import React from "react";
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
import DataSet from "@antv/data-set";

import { Divider } from 'antd';
import { GDPAnnual } from './data'

class Stackedcolumn extends React.Component {
  render() {

    const data = GDPAnnual[this.props.region]

    const scale = {
      year:{
        range: [ 0.1, 0.9 ]
      },
      value:{
        'alias' :'GDP总量(亿元)'
      },
      rate:{
        'alias' :'增长率(%)'
      },
    }

    return (
      <div>
        <Divider orientation="left"> {this.props.regionName}近几年 GDP 走势 </Divider>
        <Chart 
            height={300} 
            width={700} 
            data={data} 
            scale={scale}
            forceFit 
            padding={[ 10 , 100, 80 , 100]} >
          <Legend             
            position="bottom" 
            />
          <Axis name="year" />
          <Axis name="value" title />
          <Axis name="rate" title />
          <Tooltip />
          <Geom
            type="intervalStack"
            position="year*value"
            color={["type",['#7fc97f','#beaed4','#fdc086']]}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
          <Geom type="line" position="year*rate"  
            color='#b3cde3'
            size={2} />
          <Geom
            color='#b3cde3'
            type="point"
            position="year*rate"
            size={4}
            shape={"circle"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default Stackedcolumn;