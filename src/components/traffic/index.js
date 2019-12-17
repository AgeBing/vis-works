import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import './index.css';

import TrafficMap from './Scene';
// import Widgets from  './TimeWidget'

class Traffic extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
    }
  }

  componentWillMount(){

  }
  handleUpdateMapTime(h){
    console.log("map time",h)
    this.setState({ mapTime:h })
  }

  render(){
  return (
    <div className="traffic-app">       
    	<TrafficMap hour={this.state.mapTime}></TrafficMap>
      {/* <div className='widget-time'>
        <Widgets updateMapTime={this.handleUpdateMapTime.bind(this)} >
        </Widgets>
      </div> */}
    </div>
  )}
}

export default Traffic;
