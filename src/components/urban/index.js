import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import './index.css';

import MyMap from './Scene';
import Widgets from  './TimeWidget'

class Urban extends React.Component {
  
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
    <div className="urban-app">       
    	<MyMap hour={this.state.mapTime}></MyMap>
      <div className='widget-time'>
        <Widgets updateMapTime={this.handleUpdateMapTime.bind(this)} >
        </Widgets>
      </div>
    </div>
  )}
}

export default Urban;
