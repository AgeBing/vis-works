import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Label,
  Legend
} from "bizcharts";
import './vis.css';


class Vis extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      selectFloor : ''
    }
  }


  componentWillMount(){
    let self = this
    this.setTime()
    setInterval(self.setTime.bind(self), 60000);
  }

  setTime(){
    this.setState({curTime: new  Date().toLocaleString().slice(0,-3)})
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
        <h2 className='title'>
          楼层火灾态势感知
        </h2>
        <div className='sub-title-container'> 
          <h3 className='sub-title'>
            地点
          </h3>
          <h3 className='sub-title'>
            {this.state.curTime}
          </h3>
        </div>
        <Chart height={330} data={this.props.data}  padding={50} scale={scale} forceFit
           onGetG2Instance={g2Chart => {self.chartIns = g2Chart;}}
           onPlotClick={ev => {
              var point = {
                x: ev.x,
                y: ev.y
              };
              var items = self.chartIns.getTooltipItems(point);
              let floor = items[0]['point']['point']['floor']  
              self.setState({ selectFloor : floor })

              let sum = 0
              self.props.data.map((row)=>{
                if(row['floor']  == floor){
                   sum += row['percent']
                }
              })

              self.props.selectFloor(floor , sum/100)
            }}

        >
          <Legend  position='top'/>
          <Axis name="楼层"  title='楼层'/>
          <Axis name="过火量" />
          <Tooltip />
          <Geom
            type="intervalStack"
            position="floor*percent"
            color={["type" , (filed) => { 
              let color = ['#ad2102','#d4380d']
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

            tooltip={['floor*percent*type', (floor, percent,type) => {
              return {
                name: '楼层:' + floor,
                title: type ,
                value: '过火量' + percent + '%'
              };
            }]}
          >
          <Label
            content='name'
            formatter={(text, item, index)=>{
              // console.log(item)
              // text 为每条记录 x 属性的值
              // item 为映射后的每条数据记录，是一个对象，可以从里面获取你想要的数据信息
              // index 为每条记录的索引
              var point = item.point; // 每个弧度对应的点

              let sum = 0

              self.props.data.map((row)=>{
                if(row['floor']  == point['floor']){
                   sum += row['percent']
                }
              })

              if(point.type == '新增区域')
                return sum + '%'
              return null;
            }}
              textStyle={{
                fill: 'white', // 文本的颜色
                fontSize: '12', // 文本大小
                fontWeight: 'bold', // 文本粗细
              }}
          />
          </Geom>
        </Chart>
      </div>
    );
  }
}
export default Vis
