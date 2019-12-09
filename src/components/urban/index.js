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

  render(){
  return (
    <div className="urban-app">       
    	<MyMap></MyMap>
      <div className='widget-time'>
        <Widgets>
        </Widgets>
      </div>
    </div>
  )}
}

export default Urban;
