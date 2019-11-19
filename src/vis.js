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


class Vis extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      selectFloor : ''
    }
  }


  componentWillMount(){

    let floors = ['f1','f2','f3','f3a','f4','f5']
    let types  = ['上一时刻','新增区域']

    let data = []

    for(let i = 0;i < floors.length;i++){
      for(let j = 0;j < types.length;j++){
          data.push({
            'floor' : floors[i],
            'type'  : types[j],
            'percent' : Math.round(Math.random() * 50)
          })
      }
    }

    this.setState({
      data 
    })
  }

  render() {
    const scale = {
      percent:{
        type:"linear",
        min:0,
        max:100,
      },
    }
    let self = this

    return (
      <div>

        <Chart height={400} data={this.state.data}  padding={70} scale={scale} forceFit
           onGetG2Instance={g2Chart => {self.chartIns = g2Chart;}}
           onPlotClick={ev => {
              var point = {
                x: ev.x,
                y: ev.y
              };
              var items = self.chartIns.getTooltipItems(point);
              console.log(items);
              let floor = items[0]['title']
              
              
              self.setState({ selectFloor : floor })

              self.props.selectFloor(floor)
            }}

        >
          <Legend />
          <Axis name="楼层" />
          <Axis name="过火量" />
          <Tooltip />
          <Geom
            type="intervalStack"
            position="floor*percent"
            color={["type" , (filed) => { 
              let color = ['#ff9c6e','#ad2102']
              return filed == '上一时刻' ? color[0] : color[1]
            }]}
            opacity={['floor' , (floor)=>{ // 回调函数
              if(self.state.selectFloor == '') return 1
              if(floor == self.state.selectFloor)
                return 1;
              return 0.3;
              }]}

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
export default Vis
