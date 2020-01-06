import React, { Component } from 'react'
import * as d3 from 'd3'
import * as L7 from '@antv/l7';

// 采用七牛云 存储 
// 注意 30 天绑定域名会变化
const centerCsvUrl = 'http://q1vcletmu.bkt.clouddn.com/center_gcj02.csv'
const centerRoadUrl = 'http://q1vcletmu.bkt.clouddn.com/road_400_f.csv'
const trajsUrlBase = "http://q1vcletmu.bkt.clouddn.com/"
const movesUrl = "https://gw.alipayobjects.com/os/basement_prod/40ef2173-df66-4154-a8c0-785e93a5f18e.json"
const kakouCsvUrl = 'http://q1vcletmu.bkt.clouddn.com/kakou.csv'

class MyMap extends Component {
  state = {
  }
 
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    this.createInstance()
  }
  componentWillReceiveProps(nextProps) {

    // if (this.props.hour !== nextProps.hour && this.props.hour ){
    //     let hour = nextProps.hour
    //     console.log('render' , hour)
    //     this.drawLinesUpdate(this.state.trajs[hour])
    // }

    if(nextProps.inputData  &&  this.props.inputData['timeStamp'] !== nextProps.inputData['timeStamp'] ){
      // this.drawLinesUpdate( inputData['lines'] )
      console.log( nextProps.inputData )
      let lines = nextProps.inputData['lines']
      lines = lines.map((l)=>{
          return {
            'lng1' : +l['lng1'],
            'lat1' : +l['lat1'],
            'lng2' : +l['lng2'],
            'lat2' : +l['lat2'],
          }
      })
      this.drawLinesUpdate( lines )
    }
  }
  async createInstance(){
    let self = this
    var scene = new L7.Scene({
      id: 'map',
      // mapStyle: 'dark',
      mapStyle: 'light',
      center: [114.5082664490,38.0413316426],
      // center: [120.19382669582967, 30.258134],
      // pitch: 60,
      zoom: 12,
      // zoom: 13.8,
      zoomControl: false,
      scaleControl: false,
      attributionControl: false
    });
    this.scene = scene
    scene.on('loaded', async function() {
    })
  }
  drawLinesUpdate(lines){
    let ll 
    let self = this
    if(!self.trajsLayer){
      let ll = self.scene.LineLayer({
        zIndex: 3
      })
      .source(lines, {
        parser: {
          type:'json',
          x: 'lng1',
          y: 'lat1',
          x1: 'lng2',
          y1: 'lat2'
        }
      })
      .shape('line')
      .size(3)
      .color('#A1D7FF')
      .style({
        opacity: 0.85,
      })
      // .animate({
      //   enable:true, // 开启动画
      //   interval:0.2, //  0-1 轨迹间隔 
      //   duration:2, // 动画时间
      //   trailLength:0.4, // 轨迹长度 0-1
      // })
      .render()

      self.trajsLayer = ll
    }else{
      ll = self.trajsLayer
      ll.setData(lines, {
        parser: {
          type:'json',
          x: 'lng1',
          y: 'lat1',
          x1: 'lng2',
          y1: 'lat2'
        }
      })
    }
  }
  render() {
    return (
      <div
        id='map'
        className='map-app'
        ref={div => {
          this.mapWrapper = div
        }}
      >
      </div>
    )
  }
}
export default MyMap