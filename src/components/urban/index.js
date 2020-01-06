import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './index.css';
import moonIcon from '../../image/moon.png'
import sunIcon from '../../image/sun.png'
import fireIconImage from '../../image/fireIcon.png'
import { Icon,Button,Drawer,Switch,Divider,Input,AutoComplete,TimePicker } from 'antd'

import MyMap from './Scene';
import TimeWidget from  './TimeWidget'
import KakouList  from  './KakouList'
import KakouDetail from './KakouDetail'
import ReachDetail from './ReachDetail'

import * as _ from 'underscore'
import moment from 'moment';

const format = 'HH:mm';

class Urban extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      selectedKakou: {},
      drawerVisible: false,  //控制面板显示
      visbilities: [
        {
          'name': 'flow',
          'visible': true,
          'alias': '轨迹流图',
          'style':{ 
            color: '#70C9EB'
          }
        },
        {
          'name': 'context',
          'visible': false,
          'alias': '卡口区域图'
        },
        {
          'name': 'heat',
          'visible': false,
          'alias': '热力图'
        },
        {
          'name': 'reach',
          'visible': false,
          'alias': '消防站'
        }
      ],
      pitchMode : '3D',
      mapTime : 6,
      mapTheme : 'dark',
      widgetMode: 'kakouList' ,  
    }
  }
  componentWillMount(){}

  /*
    修改 时间
  */
  handleUpdateMapTime(h){
    this.setState({ mapTime:h })
  }


  /*
    修改地图
  */
  handleLayerVisibleSwitch(name,v){
    let { visbilities } = this.state
    visbilities.map((vObj)=>{
      if(name == vObj['name'])
        vObj['visible'] = v
    })
    this.setState({ visbilities })
  }
  handleChangeMapPitch(){
    let { pitchMode }= this.state
    pitchMode =  pitchMode == '2D' ? '3D' : '2D'
    this.setState({ pitchMode })
  }
  handleChangeMapTheme(){
    let { mapTheme }= this.state
    mapTheme =  mapTheme == 'dark' ? 'light' : 'dark'
    this.setState({ mapTheme })
  }
  hanleKakouSearch(e){
    this.setState({
      kakouSearchText : e.target.value
    })
  }

  handleDrawPOIOnMap =( poi )=>{
      this.setState({
        poiOnMap : poi
      })
  }
  handleDrawReachOnMap = (poi)=>{
      this.setState({
        reachCenter : poi
      })
  }

  handleShowStations = ( visible ) =>{
      const { visbilities } = this.state

      visbilities.map((o)=>{
        if(o['name'] == 'reach'){
          o['visible'] = visible
        }
      })

      this.setState({
          visbilities
      })
  }

  /* 组件展示流程  */
  handleWidgetDetailReturn = ()=>{
    this.setState({ widgetMode:'kakouList' })
  }
  handleShowReachDetail = ()=>{
    this.setState({ widgetMode:'reachDetail' })
  }
  showConfigPanel(){
    this.setState({
      drawerVisible: true,
    });
  }
  hideConfigPanel(){
    this.setState({
      drawerVisible: false,
    });
  }
  hanleShowKakouDetaile(kakou){
    this.setState({ 
      widgetMode: 'kakouDetail',
      selectedKakou:kakou 
    })
  }
  handleDrawRoute = ( trajs )=>{
    this.setState({
        routeTrajs : trajs
    })
  }
  renderWidgetPanel(){
      const { widgetMode } = this.state
      let returnDom
      switch(widgetMode){
         case 'kakouDetail':
            returnDom =  ( 
                <KakouDetail 
                  kakou={this.state.selectedKakou} 
                  returnFunc={this.handleWidgetDetailReturn.bind(this)}
                /> 
            )
            break;

          case 'kakouList':
            returnDom = ( 
                <div style={{width: '100%', height: '100%'}}>
                  <KakouList 
                    hour={this.state.mapTime}
                    selectKakouFunc={this.hanleShowKakouDetaile.bind(this)}/>

                  <div className="config-btn-contain">
                    <Button shape="circle" icon="setting" onClick={this.showConfigPanel.bind(this)}/>
                    
                    <Button shape="circle" onClick={this.handleChangeMapTheme.bind(this)}>
                      <img className='img-icon' src={this.state.mapTheme == 'light' ? moonIcon : sunIcon } />
                    </Button>
                    
                    <Button shape="circle" style={{ 'fontSize':'24px'}} onClick={this.handleChangeMapPitch.bind(this)}> 
                      {this.state.pitchMode} 
                    </Button>
                    
                    <Button 
                      shape="circle" 
                      style={{ 'fontSize':'24px'}} 
                      onClick={this.handleShowReachDetail.bind(this)}
                      > 
                      <img className='img-icon' src={fireIconImage} />
                    </Button>

                  </div>
                </div>
            )
            break

          case 'reachDetail':
          returnDom = (
              <ReachDetail
                  returnFunc={this.handleWidgetDetailReturn.bind(this)}
                  drwaPOIOnMap={this.handleDrawPOIOnMap}
                  drwaReachOnMap={this.handleDrawReachOnMap}
                  showStations={this.handleShowStations}
                  drawRoutes={this.handleDrawRoute}

              />
            )
            break
      }

      return returnDom
  }

  


  render(){
    const self = this
    const { poiRowTexts, value } = this.state;
    
    return (
      <div className="urban-app">       

        {/*   地图   */}
      	<MyMap 
          hour={this.state.mapTime}
          seletcKakou = {this.hanleShowKakouDetaile.bind(this)}
          {...this.state}
        >
        </MyMap>

          {/*
          selectedKakou={this.state.selectedKakou}
          visbilities={this.state.visbilities}
          pitchMode={this.state.pitchMode}
          mapTheme={this.state.mapTheme}
          kakouSearchText={this.state.kakouSearchText}
          poiOnMap={this.state.poiOnMap}
          reachCenter={this.state.reachCenter}
          */}


        {/*   右边控件栏   */}
        <div className='widget'>
          { self.renderWidgetPanel() }
        </div>


        {/*   左边控件栏   */}
        <Drawer
          title="配置面板"
          placement="left"
          mask={false}
          closable={true}
          onClose={this.hideConfigPanel.bind(this)}
          visible={this.state.drawerVisible}
          width={400}
        >
        
          <Divider orientation="left"> 图层控制 </Divider>
            { this.state.visbilities.map((vObj,)=>{ 
              if(vObj['name'] == 'reach') return ''
              return(
                <div className='control-row' key={vObj['name']}>
                  <div className='control-label'>{vObj['alias']}</div>
                  <Switch  
                      checked={vObj['visible']}  
                      style ={vObj['style']} 
                      onClick={this.handleLayerVisibleSwitch.bind(this,vObj['name'])} 
                  />
                </div>
              )
            })}

          <Divider orientation="left"> 卡口搜索 </Divider>
          <div className='control-row'>
            <Input placeholder="Basic usage"  onChange={this.hanleKakouSearch.bind(this)}/>
          </div>
         
          <Divider orientation="left"> 时间选择 </Divider>
          <div className='control-row'>
            <TimeWidget  updateMapTime={this.handleUpdateMapTime.bind(this)} />
          </div>
      </Drawer>


      </div>
    )
  }
}

export default Urban;
