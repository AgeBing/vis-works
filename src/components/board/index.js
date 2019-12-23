import React from 'react';
import { BrowserRouter, Route, Link, Switch,withRouter } from 'react-router-dom'
import { Card, Col, Row,Button } from 'antd';
import './index.css';
import fireImg from '../../image/snapshots/fire.png'
import urabnImg from '../../image/snapshots/urban.png'
import gdpImg from '../../image/snapshots/gdp.png'



class Board extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {

    }
  }

  componentWillMount(){
  

  }
  redirectTo(route){
    this.props.history.push(route)
  }


  render(){
    const coverStyle = {
      height : '300px'
    }
  return (
  <div className='board-app'>
    <Row gutter={16}>
      
      <Col span={8}>
        <Card
          hoverable
          cover={<img alt="example" src={fireImg} style={coverStyle}/>}
          onClick={this.redirectTo.bind(this,'/fire')}
        >
          <Card.Meta 
            title="火灾可视化" 
            description="展示商城中不同楼层的火灾情况" />
        </Card>
      </Col>

      <Col span={8}>
        <Card  
          hoverable
          cover={<img alt="example" src={urabnImg} style={coverStyle}/>}
          onClick={this.redirectTo.bind(this,'/urban')}
        >
          <Card.Meta 
            title="城市可视化" 
            description="使用 @antv/L7 进行展示" />
        </Card>
      </Col>

      <Col span={8}>
        <Card  
          hoverable
          cover={<img alt="example" src={gdpImg} style={coverStyle}/>}
          onClick={this.redirectTo.bind(this,'/gdp')}
        >
          <Card.Meta 
            title="宏观经济可视化" 
            description="展现浙江省及宁波市宏观经济情况" />
        </Card>
      </Col>

      {/*
      <Col span={8}>
        <Card  
          hoverable
          cover={<img alt="example"  style={coverStyle}/>}
          onClick={this.redirectTo.bind(this,'/traffic')}
        >
          <Card.Meta 
            title="旭日图" 
            description="使用 @antv/L7 进行展示" />
        </Card>
      </Col>
      */}
    </Row>

    <div className='links-contain'>
      <a href='https://github.com/AgeBing/vis-works' className='ref-icons'>
        <Button shape="circle" icon="github"/>
      </a>
      <a 
        className='ref-icons'>
        <Button shape="circle" icon="read"/>
      </a>
    </div>
    
  </div>
  )}
}

export default withRouter(Board);
