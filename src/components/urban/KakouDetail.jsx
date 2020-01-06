import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './index.css';

import  FlowWidget  from  './charts/FlowWidget'
import  PieWidget  from  './charts/PieWidget'

import { Divider,Button,Descriptions } from 'antd';

class KakouDetail extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  componentWillMount(){

  }

  handleReturnBack(){
    console.log('back')
    this.props.returnFunc()
  }
  render(){
    let { id,name,direction,location }  = this.props.kakou
    return (
      <div style={{width: '100%', height: '100%', padding:'0 15px'}}>
          <div className='left-return-btn'>
            <Button  type="dashed" icon='left' onClick={this.handleReturnBack.bind(this)}></Button>
          </div>
          <Divider orientation="left"> 路口信息 </Divider>
          <div className='kakou-description'>
            <div className='des-row'>
              <div className='des-label'> 名称:  </div>
              <div className='des-value'>  {name} </div>
            </div>
            <div className='des-row'>
              <div className='des-label'> 方向:  </div>
              <div className='des-value'>  {direction} </div>
            </div>
            <div className='des-row'>
              <div className='des-label'> 范围:  </div>
              <div className='des-value'>  {location} </div>
            </div>
            <div className='des-row'>
              <div className='des-label'> ID:  </div>
              <div className='des-value'>  {id} </div>
            </div>

          </div>
          <FlowWidget />
          <PieWidget  />
      </div>
    )
  }
}

export default KakouDetail;
