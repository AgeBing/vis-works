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
import numeral from 'numeral';
import { Divider } from 'antd';
import { GDP } from './data'


class Labelline extends React.Component {
  render() {
    const { DataView } = DataSet;

    const data = GDP[this.props.region]
    const dv = new DataView();
    dv.source(data).transform({
      type: "percent",
      field: "value",
      dimension: "district",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: val => {
          val = val * 100 + "%";
          return val;
        }
      }
    };
    return (
      <div>
        <Divider orientation="left"> {this.props.regionName}各下属区域 GDP比例 </Divider>
        <Chart
          height={300} 
          width={700} 
          data={dv}
            forceFit 
            padding={[ 10 , 100, 30 , 100]} 
        >
          <Coord type="polar" innerRadius={0.05} />
          <Axis name="district"  />
          <Axis name="percent"  visible={false} />

          <Legend
            position="right"
          />
          <Tooltip
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          <Geom
            type="interval"
            position="district*percent"
            color="#ffbb96"
            style={{
              lineWidth: 1,
              stroke: "#fff",
            }}
            opacity={1}
            tooltip={[
              "district*percent",
              (district, percent) => {
                percent = percent * 100 + "%";
                return {
                  name: district,
                  value: percent
                };
              }
            ]}
          >
            <Label
              content="percent"
              formatter={(val, item) => {
                val = numeral(val || 0).format('0.0%')
                return  val;
              }}
              textStyle= {{
                textAlign: 'center', // 文本对齐方向，可取值为： start middle end
                fill: '#404040', // 文本的颜色
                fontSize: '10', // 文本大小
              }}
              offset={-10}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default Labelline;