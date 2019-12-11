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

    if (this.props.hour !== nextProps.hour && this.props.hour ){
        let hour = nextProps.hour
        console.log('render' , hour)
        this.drawLinesUpdate(this.state.trajs[hour])
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
      pitch: 60,
      // zoom: 13.2,
      zoom: 13.8,
      zoomControl: false,
      scaleControl: false,
      attributionControl: false
    });
    this.scene = scene
    scene.on('loaded', async function() {
        let kakou = await self.getKakous()
        let trajs = await self.getTrajs(kakou.map)
        console.log(trajs)
        self.drawPoints(kakou.arr)
        self.setState({ trajs })

        // for(let i = 0; i < 14;i++){
        //   let T  = 2000
        //   setTimeout(()=>{
        //       self.drawLinesUpdate(trajs[i])
        //   },T * i)
        // }

    })
  }
  async getKakous(){
    return new Promise((resolve,reject)=>{
        d3.csv(kakouCsvUrl).then((data)=>{
          let kakous = []
          let ids = new Set()
          let kakouMap = new Map()
          // data = data.slice(0,20)
          data.map((row)=>{
              if(row['location'] == '二环内'){
                  let id = row['I_ID'],
                      lng =  +row['longitude'],
                      lat =  +row['latitude']
                  if(!ids.has(id)){
                    kakous.push({
                        id , lng , lat,
                        name : id
                    })
                    // kakous.push({
                    //   "type": "Feature",
                    //   "geometry": {
                    //     "type": "Point",
                    //     "coordinates": [lng, lat]
                    //   },
                    //   "properties": {
                    //       "name": id
                    //   }
                    // })
                    kakouMap.set(id , { lng ,lat })
                  }
                  ids.add(row['I_ID'])
              }
          })  
          console.log(kakous.length)
          // kakous = {
          //   "type": "FeatureCollection",
          //   "features": kakous
          // }
          resolve( { arr:kakous,map:kakouMap }  )
        })
    })
  }
  async getTrajs(kakouMap){

    let ps = []

    for(let i = 1;i < 15;i++){
        let p = new Promise((resolve,reject)=>{

                    let trajUrl = trajsUrlBase + "t_df_" + i + ".csv"
                    d3.csv(trajUrl).then((data)=>{
                      let trajs = []
                      data.map((row)=>{
                        let s = row['s'],
                            e = row['e'],
                            s_p = kakouMap.get(s),
                            e_p = kakouMap.get(""+e)
                        if(s_p && e_p){  // 卡口点存在
                          trajs.push({
                            lng1 : s_p['lng'],
                            lat1 : s_p['lat'],
                            lng2 : e_p['lng'],
                            lat2 : e_p['lat']
                          })
                        }
                      })  
                      console.log(trajs.length)
                      resolve( trajs )
                    })
                })

        ps.push( p )
    }

    return Promise.all(ps)
  }
  drawPoints(points){
      let self = this
      let pl = self.scene.PointLayer({
          zIndex: 2
      })
      .source(points,{
        parser:{
            type:'json',
            x : 'lng',
            y : 'lat',
            name: 'name',
        },
      })
      .shape('circle')
      // .shape('name', 'text')
      .size(1) 
      .active(true)
      .color('#ffc53d')
      .style({
        opacity: 0.8,
        strokeWidth: 0
      })
      .render();
      pl.setHeight(10)

      pl.on('click', (ev)=>{
        console.log(ev)
      });
  }
  prepareLineLayer(){
    let self = this

    let ll = self.scene.LineLayer({
      zIndex: 3
    })
    .shape('line')
    .size(3)
    .color('#722ed1')
    .style({
      opacity: 0.85,
    })
    .animate({
      enable:true, // 开启动画
      interval:0.2, //  0-1 轨迹间隔 
      duration:2, // 动画时间
      trailLength:0.4, // 轨迹长度 0-1
    })
    .render()
    console.log(ll)

    return ll 
      // .render();
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
      .color('#40a9ff')
      .style({
        opacity: 0.85,
      })
      .animate({
        enable:true, // 开启动画
        interval:0.2, //  0-1 轨迹间隔 
        duration:2, // 动画时间
        trailLength:0.4, // 轨迹长度 0-1
      })
      .render()

      self.trajsLayer = ll
    }else{
      console.log(lines.length)
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