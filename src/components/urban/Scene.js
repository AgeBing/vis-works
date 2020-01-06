import React, { Component } from 'react'
import PropTypes from 'prop-types';

import * as d3 from 'd3'
import * as L7 from '@antv/l7';
import * as hull from 'hull.js'
import * as turf from '@turf/turf'


import imageStation from '../../image/消防站.png'
import  FlowLayout  from './layout/Flow'
import  HeatLayout   from './layout/Heat'
import  ContextLayout  from './layout/Context'
import ReachLayout from './layout/Reach'
// 采用七牛云 存储 
// 注意 30 天绑定域名会变化
// const qiniuDomain =  'http://localhost:3001/'
const qiniuDomain = '/'
// const trajsUrlBase = 'http://localhost:3001/'
const trajsUrlBase = '/'

const centerCsvUrl = qiniuDomain + "center_gcj02.csv"
const centerRoadUrl = qiniuDomain + "road_400_f.csv"
const kakouCsvUrl =  qiniuDomain + "kakou.csv"



// 设置 传入 的 props , 进行类型检查
let propTypes = {
    
    //  显示的时间 
    hour : PropTypes.number , 

    //  用户选择某卡口时触发的 函数
    seletcKakou : PropTypes.func,

    // 3D  还是 2D
    pitchMode : PropTypes.string,

    // dark 还是 light
    mapTheme : PropTypes.string,

    // 各个视图 显示或隐藏 的配置项
    visbilities : PropTypes.array,


    // 用户选择的某个 卡口
    selectedKakou : PropTypes.object

};

class MyMap extends Component {
  state = {
  }
  constructor(props) {
    super(props)
  }
  componentWillMount(){}
  componentDidMount(){
    this.createInstance()
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.hour !== nextProps.hour && this.props.hour ){
        let hour = nextProps.hour
        // this.drawLinesUpdate(this.state.trajs[hour])
        this.updateDate(hour)
    }

    // 用户选择的卡口更新
    if (nextProps.selectedKakou && this.props.selectedKakou.id !==  nextProps.selectedKakou.id){
        let kakou = nextProps.selectedKakou
        this.FlyToCenter( kakou.lng , kakou.lat )
    }

    
    this.switchTheme(nextProps.mapTheme)

    if( nextProps.kakouSearchText !== this.props.kakouSearchText){
      this.searchKakou(nextProps.kakouSearchText)
    }
    if( nextProps.pitchMode !== this.props.pitchMode ){
      this.switchPitchMode(nextProps.pitchMode)
    }
    if( nextProps.poiOnMap !== this.props.poiOnMap ){
      this.drawPoi( nextProps.poiOnMap)
    }

    if( nextProps.reachCenter !== this.props.reachCenter ){
      this.drawReach( nextProps.reachCenter )
    }

    if( nextProps.routeTrajs !== this.props.routeTrajs ){
     this.drawRoute( nextProps.routeTrajs )
    }

    
    // 每次都调一次  ， 具体变化在函数内部
    this.switchVisibility(nextProps.visbilities)

  }

  async createInstance(){
    let self = this
    var scene = new L7.Scene({
      id: 'map',
      mapStyle: 'dark',
      // mapStyle: 'light',
      // center: [114.5082664490,38.0413316426],
      center:[114.50175901191922, 38.04101919751572],
      // pitch: 85,
      zoom:17.1,
      // zoom:13.2,
      zoomControl: false,
      scaleControl: false,
      attributionControl: false
    });
    this.scene = scene

    scene.on('loaded', async function() {

        // 获取数据
        let kakou = await getKakous()
        let trajs = await getTrajs( kakou['map'] )
        this.kakouMap = kakou['map']
        self.setState({ trajs,kakou })

        // 添加 各 layer 
        const layers = []
        let   layer 
        layer = new FlowLayout()
        layer.init(scene , kakou.arr , trajs[0] )
        layers.push({
           'name'  :  'flow',
           'layer' :  layer
        })

        layer = new HeatLayout()
        layer.init(scene , kakou.arr )
        layers.push({
           'name'  :  'heat',
           'layer' :  layer
        })


        layer = new ContextLayout()
        layer.init(scene , trajs )
        layers.push({
           'name'  :  'context',
           'layer' :  layer
        })

        layer = new ReachLayout()
        layer.init(scene)
        layers.push({
           'name'  :  'reach',
           'layer' :  layer
        })

        self.setState({ layers })
        self.switchVisibility(self.props.visbilities , { layers } )
        self.switchPitchMode( self.props.pitchMode )
    })
  }
  /*
    设置 俯仰角
    过渡时有动画
  */  
  switchPitchMode(mode){
    let self = this
    let cur = this.scene.getPitch(),
        target 

    if(mode == '2D'){
        target = 0
    }else{
        target = 85
    }

    let low,high
    if(cur >= target){
        high = cur
        low  = target
    }else{
        high = target
        low  = cur 
    }
    // 做一个动画 ，中间做个过渡，不是一下子变过去
    let t = 5,
        a = (target - cur)/Math.abs(target - cur)

    for(let i = low ; i <= high;i++){
        let j = i - low

        setTimeout(()=>{
          self.scene.setPitch( cur + a * j )
        }, j*t )
    }
  }
  /*
    调整主题
  */
  switchTheme(theme){
    let t = this.scene['_attrs']['mapStyle']
    // if(t != theme)
      this.scene.setMapStyle(theme)
  }
  /*
    调整画面中心
  */
  FlyToCenter(lon,lat){
    this.scene.panTo([lon,lat])
  }
  searchKakou(text){
    if(!this.kakouMap) return

    let res = this.kakouMap.get(text)
    if(res){
      console.log(res)
      this.FlyToCenter(res['lng'],res['lat'])
    }
  }
  /*
    设置各图层的显示与隐藏
  */
  switchVisibility(visbilities , defaultLayers){
    let { layers } = defaultLayers || this.state
    if(defaultLayers){
      layers = defaultLayers.layers
    }

    let visMap = new Map()
    visbilities.map((obj)=>{
        let { name,visible } = obj
        visMap.set(name , visible )
    })

    layers.map((layerObj)=>{
        const { name, layer } = layerObj

        layer.setVisibility( visMap.get(name) )
    })

  }


  /*
    更新各图层
  */
  updateDate( hour ){
    let { layers,trajs } = this.state

    layers.map((layerObj)=>{
        let { name,layer } = layerObj

        switch(name){
          case 'flow':
            layer.update( trajs[hour] )
            break;

        }


    })

  }


  /*
    reach 模块
  */
  drawPoi(poi){
    let { layers,trajs } = this.state

    layers.map((layerObj)=>{
      if(layerObj['name'] == 'reach'){
        layerObj['layer'].updatePOI( poi['lng'] , poi['lat'] )
      }
    })

    this.FlyToCenter( poi['lng'] , poi['lat'] )
  }
  drawReach( center ){
    let { layers } = this.state
    center = [ center['lng'] , center['lat']]
    const { kakou }  = this.state
    const to = turf.point( center )
    const withinKakous = []
    const maxDistance = 5
    kakou.arr.map((_kakou)=>{
        let  from = turf.point([ _kakou['lng'] , _kakou['lat'] ]);

        let distance = turf.distance(from, to, { units:'kilometers'});
        if( distance < maxDistance){
            
            //  加个随机  让形状不规则
            let drop = Math.random()
            if(drop > 0.5){
                withinKakous.push(
                    [ _kakou['lng'] ,_kakou['lat'] ]
                )
            }

        }
    })

    var pts = hull(withinKakous,  0.02)

    let lines = []

    for(let i = 1 ;i < pts.length ;i++){
        let last = pts[i-1]
        let curt = pts[i]
        lines.push({
            lng1 : last[0],
            lat1 : last[1],
            lng2 : curt[0],
            lat2 : curt[1]
        })
    }

    layers.map((layerObj)=>{
      if(layerObj['name'] == 'reach'){
        layerObj['layer'].updateHull( lines )
      }
    })
  }
  drawRoute(trajs){
    let { layers } = this.state

    let lines = []
    for(let i = 1;i< trajs.length;i++){
        lines.push({
            lng1 : trajs[i-1]['lng'],
            lat1 : trajs[i-1]['lat'],
            lng2 : trajs[i]['lng'],
            lat2 : trajs[i]['lat']
        })
    }

    layers.map((layerObj)=>{
      if(layerObj['name'] == 'reach'){
        layerObj['layer'].updateRoute( lines )
      }
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



MyMap.propTypes  = propTypes


/*
  获取 卡口 数据
*/
async function getKakous(){
  return new Promise((resolve,reject)=>{
      d3.csv(kakouCsvUrl).then((data)=>{
        let kakous = []
        let ids = new Set()
        let kakouMap = new Map()
        data.map((row)=>{
            if(row['location'] == '二环内'){
                let id = row['I_ID'],
                    lng =  +row['longitude'],
                    lat =  +row['latitude'],
                    name = row['C_NAME'],
                    direction = row['DIRECTION_INDEX'],
                    location = row['location']

                if(!ids.has(id)){
                  kakous.push({
                      id , lng , lat,
                      name : id
                  })

                  kakouMap.set(id , { id, lng ,lat , name ,direction,location  })
                }
                ids.add(row['I_ID'])
            }
        })  

        resolve( { arr:kakous,map:kakouMap }  )
      })
  })
}
/*
  获取轨迹数据
*/
async function getTrajs(kakouMap){
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
                    console.log('traj data', i , trajs.length)
                    resolve( trajs )
                  })
              })
      ps.push( p )
  }
  return Promise.all(ps)
}


export default MyMap
