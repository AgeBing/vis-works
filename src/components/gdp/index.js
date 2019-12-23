import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './index.css';

import MapChart from './map'
import Line from './line'
import Pie from './pie'

import { Card,Row,Col,Divider } from 'antd';

const regionNames = {
  'Zhejiang' : '浙江省',
  'Ningbo'   : '宁波市'
}

class GDP extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      region:'Zhejiang',
      regionName: '浙江省'
    }
  }

  componentWillMount(){
    
  }
  handleDrill(){
    let { region,regionName } = this.state
    region =  ( region == 'Zhejiang' ? 'Ningbo': 'Zhejiang')
    regionName = regionNames[region]
    this.setState({ region,regionName })
  }
  render(){
    let { region,regionName } = this.state
    return (
      <div className="gdp-app">       
          <Row className="relative-contain" gutter={[8, 0]} style={{ 'margin': 0}} >
            <Col  span={12} className="relative-col-contain" >
              <MapChart 
                region={region} 
                regionName={regionName}
                handleDrill={this.handleDrill.bind(this)} />
            </Col>
            <Col  span={12} className="relative-col-contain">
                <div className='half-contain'>
                  <Line 
                    region={region} 
                    regionName={regionName}
                  />
                </div>
                <div className='half-contain'>
                  <Pie  
                    region={region} 
                    regionName={regionName}
                  />
                </div>
            </Col>
          </Row>
      </div>
    )
  }
}

export default GDP;
