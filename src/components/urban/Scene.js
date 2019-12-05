import React, { Component } from 'react'
import * as d3 from 'd3'
import * as L7 from '@antv/l7';

// 采用七牛云 存储 
// 注意 30 天绑定域名会变化
const centerCsvUrl = 'http://q1vcletmu.bkt.clouddn.com/center7.csv'
const centerRoadUrl = 'http://q1vcletmu.bkt.clouddn.com/road_400_f.csv'
const trajsUrl = "http://q1vcletmu.bkt.clouddn.com/new_trajs.csv"

class MyMap extends Component {
  state = {
  }
 
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    this.createInstance()
  }

  createInstance(){
    let self = this
    var scene = new L7.Scene({
      id: 'map',
      mapStyle: 'light', // 样式URL
      center: [114.5082664490,38.0413316426],
      // center: [102.602992, 23.107329],
      pitch: 15,
      zoom: 13.2
    });
    this.scene = scene
    scene.on('loaded', function() {
        self.drawPoints()
        self.drawLines()
    });
  }
  drawPoints(){
      let self = this
      d3.csv(centerCsvUrl , (row)=>{
        let p = {
          'lng' :  +row['longitude'],
          'lat' :  +row['latitude'],
        }
        return p 
      })
      .then(data => {
        self.scene.PointLayer({
          zIndex: 2
        })
        .source(data,{
          parser:{
              type:'json',
              x : 'lng',
              y : 'lat'
          }
        })
        .shape('circle')
        .size(4) 
        .active(true)
        .color('#5B8FF9')
        .style({
          opacity: 0.3,
          strokeWidth: 1
        })
        .render();
      });
  }
  drawLines(){
    let self = this
    const centerMap = new Map()
    const lines = []

    d3.csv(centerCsvUrl , (row)=>{
      let p =  {
        'lng' :  +row['longitude'],
        'lat' :  +row['latitude'],
        'id'  :  +row['id']
      }
      return p 
    }).then(centers => {
      centers.map((center)=>{
         centerMap.set(center.id , center)
      })
      d3.csv(centerRoadUrl).then((roadData)=>{
          roadData.map((road)=>{
            let s = road['v1'],
                e = road['v2'],
                s_p = centerMap.get(+s),
                e_p = centerMap.get(+e)
            lines.push({
              lng1 : s_p['lng'],
              lat1 : s_p['lat'],
              lng2 : e_p['lng'],
              lat2 : e_p['lat']
            })
          })
          console.log("道路数量",lines.length)

          self.scene.LineLayer({
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
          .size(1)
          .color('#722ed1')
          .style({
            opacity: 0.85,
          })
          .render();

        })
    })
  }

  render() {
    return (
      <div
        id='map'
        style={{
          width: '100%',
          margin: '0',
          height: '100%',
          position: 'absolute'
        }}
        ref={div => {
          this.mapWrapper = div
        }}
      >
      </div>
    )
  }
}
export default MyMap