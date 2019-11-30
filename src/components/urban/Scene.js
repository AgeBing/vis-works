import React, { Component } from 'react'
import { Scene, PointLayer,LineLayer } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import * as d3 from 'd3'
import centerCsv from '../../data/center.csv'


class Map extends Component {
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
      pitch: 90,
      type: 'amap',
      style: 'light',
      center: [ 114.5082664490,38.0413316426 ],
      zoom: 13, 
      token: '49aa9ff2c3f76f61ddd2d9b1302ebbd3'
      }),
    })

    self.drawPoints()
    self.drawLines()
  }

  drawPoints(){
    let self = this

    d3.csv(centerCsv , (row)=>{
      return {
        'lng' :  +row['longitude'],
        'lat' :  +row['latitude'],
      }
    })
    .then(data => {
      console.log(data.length)
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

    d3.csv(centerCsv , (row)=>{
      return {
        'lng' :  +row['longitude'],
        'lat' :  +row['latitude'],
      }
    })
    .then(data => {

      let points = data,
          pNum = points.length,
          lines = [],
          lNum = 5000

      for(let i = 0;i < lNum;i++){
         let s_n = Math.floor(Math.random()*pNum),
             e_n = Math.floor(Math.random()*pNum),
             s_p = points[s_n],
             e_p = points[e_n]
          lines.push({
            lng1 : s_p['lng'],
            lat1 : s_p['lat'],
            lng2 : e_p['lng'],
            lat2 : e_p['lat']
          })
      }
      console.log(lines.length)

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
        .color('#5CCEA1')
        .style({
          opacity: 0.4,
          blur: 0.2
        });

        self.scene.addLayer(layer);
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
export default Map