import React, { Component } from 'react'
import { Scene, PointLayer,LineLayer } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import * as d3 from 'd3'


// 采用七牛云 存储 
// 注意 30 天绑定域名会变化
const centerCsvUrl = 'http://q1vcletmu.bkt.clouddn.com/center7.csv'
const centerRoadUrl = 'http://q1vcletmu.bkt.clouddn.com/road_400_f.csv'
const trajsUrl = 'http://q1vcletmu.bkt.clouddn.com/new_trajs.csv'



class MyMap extends Component {
  state = {
    mapLoaded: false,
    scene: null
  }
 
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    this.createInstance()
  }


  createInstance() {
    let self = this
    this.scene = new Scene({
      id: 'map',
      map: new GaodeMap({
      // pitch: 90,
      type: 'amap',
      style: 'light',
      center: [ 114.5082664490,38.0413316426 ],
      zoom: 13.2, 
      token: '49aa9ff2c3f76f61ddd2d9b1302ebbd3'
      }),
    })

    self.drawPoints()
    self.drawLines()
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
      console.log("卡口数量",data.length)
      const pointLayer = new PointLayer({})
      pointLayer
        .source(data, {
          parser: {
            type:'json',
            x : 'lng',
            y : 'lat'
          }
        })
        .shape('circle')
        .size(4)
        .color('#5B8FF9')
        .style({
          opacity: 0.3,
          strokeWidth: 1
        })

        self.scene.addLayer(pointLayer);
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
    })
    .then(centers => {
      
      centers.map((center)=>{
         centerMap.set(center.id , center)
      })
      console.log(centerMap)

      d3.csv(centerRoadUrl)
        .then((roadData)=>{

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

            const layer = new LineLayer({})
            layer
              .source(lines, {
                parser: {
                  type:'json',
                  x: 'lng1',
                  y: 'lat1',
                  x1: 'lng2',
                  y1: 'lat2'
                }
              })
              .size(1)
              .shape('arc3d')
              .color('#722ed1')
              .style({
                opacity: 0.85,
              });
            self.scene.addLayer(layer);
        })
    });
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