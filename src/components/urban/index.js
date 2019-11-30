import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import './index.css';

import Map from './Scene';

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
    	<Map></Map>
    </div>
  )}
}

export default Urban;
