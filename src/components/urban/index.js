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
      drawerVisible: true,
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
        }
      ]
    }
  }

  componentWillMount(){

  }
  handleUpdateMapTime(h){
    console.log("map time",h)
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
  render(){
    return (
      <div className="urban-app">       
      	<MyMap 
          hour={this.state.mapTime}
          seletcKakou = {this.hanleShowKakouDetaile.bind(this)}
          selectedKakou={this.state.selectedKakou}
          visbilities={this.state.visbilities}
        >
        </MyMap>

        {/*<div className='widget-time'>*/}
          {/*<Widgets updateMapTime={this.handleUpdateMapTime.bind(this)} ></Widgets>*/}
          {/*<Widgets/>*/}
        {/*</div>*/}

        <div className='widget'>
        { this.state.showDetail ?
          ( <KakouDetail kakou={this.state.selectedKakou} returnFunc={this.hanleShowKakouOverView.bind(this)}/> ):
          ( 
            <div style={{width: '100%', height: '100%'}}>
              <KakouList selectKakouFunc={this.hanleShowKakouDetaile.bind(this)}/>
              <div className="config-btn-contain">
                <Button shape="circle" icon="setting" onClick={this.showConfigPanel.bind(this)}/>
                <Button shape="circle" icon="home"/>
                <Button shape="circle" icon="home"/>
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
            <TimeWidget />
          </div>
          </Drawer>

      </div>
    )
  }
}

export default Urban;
