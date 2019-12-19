import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './index.css';

import MyMap from './Scene';
import TimeWidget from  './TimeWidget'
import  KakouList  from  './KakouList'
import KakouDetail from './KakouDetail'
import { Icon,Button,Drawer,Switch,Divider } from 'antd'




class Urban extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      showDetail : false,
      selectedKakou: {},
      drawerVisible: false,  //控制面板显示
      visbilities:[
        {
          'name': 'flow',
          'visible': true,
          'alias': '轨迹流图',
          // 'color':'#70C9EB'
          'style':{color: '#70C9EB'}
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
        }
      ],
      pitchMode : '3D',
      mapTime : 6
    }
  }

  componentWillMount(){

  }
  handleUpdateMapTime(h){
    this.setState({ mapTime:h })
  }
  hanleShowKakouDetaile(kakou){
    this.setState({ 
      showDetail:true,
      selectedKakou:kakou 
    })
  }
  hanleShowKakouOverView(){
    this.setState({ 
      showDetail:false,
    })
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
  render(){
    return (
      <div className="urban-app">       
      	<MyMap 
          hour={this.state.mapTime}
          seletcKakou = {this.hanleShowKakouDetaile.bind(this)}
          selectedKakou={this.state.selectedKakou}
          visbilities={this.state.visbilities}
          pitchMode={this.state.pitchMode}
        >
        </MyMap>

        <div className='widget'>
        { this.state.showDetail ?
          ( <KakouDetail kakou={this.state.selectedKakou} returnFunc={this.hanleShowKakouOverView.bind(this)}/> ):
          ( 
            <div style={{width: '100%', height: '100%'}}>
              <KakouList 
                hour={this.state.mapTime}
                selectKakouFunc={this.hanleShowKakouDetaile.bind(this)}/>
              <div className="config-btn-contain">
                <Button shape="circle" icon="setting" onClick={this.showConfigPanel.bind(this)}/>
                <Button shape="circle" icon="eye"/>
                <Button shape="circle" style={{ 'fontSize':'24px'}} onClick={this.handleChangeMapPitch.bind(this)}> {this.state.pitchMode} </Button>
              </div>
            </div>
          )
        }
        </div>

          <Drawer
            title="配置面板"
            placement="left"
            mask={false}
            closable={true}
            onClose={this.hideConfigPanel.bind(this)}
            visible={this.state.drawerVisible}
          >
          
          <Divider orientation="left"> 图层控制 </Divider>

          { this.state.visbilities.map((vObj)=>{  
            return(
              <div className='control-row'>
                <div className='control-label'>{vObj['alias']}</div>
                <Switch  checked={vObj['visible']}  style ={vObj['style']} onClick={this.handleLayerVisibleSwitch.bind(this,vObj['name'])} />
              </div>
            )
          })}
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
