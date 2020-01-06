import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './index.css';
import { Icon,Button,Drawer,Switch,Divider,Input,AutoComplete,TimePicker,Descriptions,Table } from 'antd'

import * as _ from 'underscore'
import moment from 'moment';

import  LineWidget  from  './charts/LineWidget'


import { sites119 } from  './data.js' 
const key = '43c9cb89ad81d10f36e9aa7c04043e91'

const format = 'HH:mm';
const columns = [
  {
    title: '消防站',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '当前状态',
    dataIndex: 'address',
  },
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    address: `London, Park Lane no. ${i}`,
  });
}

class ReachDetail extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }

    this.hanlePOISearchDebounce = _.debounce(this.hanlePOISearch, 1000)
  }
  componentWillMount(){}

  handleReturnBack(){
    this.props.returnFunc()
  }

  // 按关键字搜索 POI 
  hanlePOISearch = (e)=> {
    let keywords = e
    // 判断是否有字母
    let p = /[a-z]/i; 
    let b = p.test( keywords );
    if(b)  return

    console.log(keywords)
    let url = `https://restapi.amap.com/v3/assistant/inputtips?key=${key}&keywords=${keywords}&city=石家庄`
    let poiRowTexts = []
    let poiRowObjs = []
    fetch(url)
        .then(res => res.json())
        .then(res => {

          //  一般只会返回 10 个
          if(res['tips'].length > 0){
              res.tips.map((poi)=>{
                if( typeof(poi['id']) == 'string' &&  typeof( poi['location'] ) == 'string' ){
                  poiRowTexts.push( poi['name'] )
                  poiRowObjs.push( poi )
                }
              })

              if(poiRowTexts.length > 0){
                this.setState({ 
                  poiRowTexts,
                  poiRowObjs
                })
              }
              console.log( poiRowTexts , poiRowObjs )
          }
        })
  }
  hanleDrawPOI(poi){
    this.props.drwaPOIOnMap(poi)
  }
  hanleSelectPOI = value => {
    let { poiRowObjs } = this.state
    poiRowObjs.map((poi)=>{
       if(poi['name'] == value){
            let locationStr = poi['location']
            let locationArr = locationStr.split(',')
            locationArr[0] = +locationArr[0]
            locationArr[1] = +locationArr[1]

            let selectPOI =  {
              'lng' :  locationArr[0],
              'lat' :  locationArr[1] 
            }
            this.hanleDrawPOI( selectPOI )
            this.setState({ selectPOI })
       }
    })
  }
  handleDrawReach = ()=>{
    const { selectPOI }  = this.state
    if(!selectPOI) return
    this.props.drwaReachOnMap( selectPOI )
  }
  handleTimeChange = (time, timeString) =>{
      console.log(time, timeString);
  }
  handleShowStations = (v)=>{
    this.props.showStations(v)
  }

  handleStationSelect = ( trajs ) =>{
      this.props.drawRoutes( trajs )

  }
  render(){
    const { poiRowTexts, value } = this.state;

    return (
      <div style={{width: '100%', height: '100%', padding:'50px 15px 0 15px'}} className='detail-app'>       
          <div className='left-return-btn'>
              <Button  type="dashed" icon='left' onClick={this.handleReturnBack.bind(this)}></Button>
          </div>

          <Divider orientation="left"> POI搜索 </Divider>
            <div className='control-row'>
                  <AutoComplete
                    dataSource={ poiRowTexts }
                    onSelect={this.hanleSelectPOI}
                    defaultOpen={true}
                    onSearch={this.hanlePOISearchDebounce}
                    style={{ width:'100%' }}
                  >
                  </AutoComplete>
            </div>

          <Divider orientation="left"> 时间选择 </Divider>
          <div className='control-row'>
            <TimePicker 
                defaultValue={moment('00:00', format)}  
                style={{ width:'100%' }}
                onChange={this.handleTimeChange} format={format} />
          </div>
          <div className='control-row'>
            <TimePicker 
              defaultValue={moment('00:00', format)}  
                style={{ width:'100%' }}
              onChange={this.handleTimeChange} format={format} />
          </div>

          <div className='control-row-center'>
            <Button  onClick={this.handleDrawReach} size='large'>
               查询可达性
            </Button>
          </div>
          <Divider orientation="left"> 消防站 </Divider>
          <div className='control-row'>
            <div className='control-label'> 在地图上显示 </div>
                <Switch  onClick={this.handleShowStations } />
          </div>

          <LineWidget 
            selectPOI={this.state.selectPOI}
            selectStation={this.handleStationSelect}
            />

      </div>
  )}
}

export default ReachDetail;
