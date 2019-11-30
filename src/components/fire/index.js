import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import './index.css';
import Vis from './vis';
import Map from './map';


import { BorderBox1,BorderBox2,
        BorderBox8
    } from '@jiaminghi/data-view-react'

class Fire extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      floor : '',
      percent: 0
    }
  }

  componentWillMount(){
    let floors = ['F1','F2','F3','F3a','F4','F5']
    let types  = ['新增区域','上一时刻']
    let data = []

    for(let i = 0;i < floors.length;i++){
      for(let j = 0;j < types.length;j++){
          let percent = Math.round(Math.random() * 25)
          if(floors[i] == 'F4' && types[j] == '新增区域')
              percent = 25
          if(floors[i] == 'F4' && types[j] == '上一时刻')
              percent = 40          

          data.push({
            'floor' : floors[i],
            'type'  : types[j],
            'percent' : percent
          })
      }
    }
    this.setState({
      data 
    })
  }

  handleFlooeSelect(floor , percent){
    this.setState({ 
      floor:floor.toLowerCase(),
      percent : percent
    })
  }

  handleReturn(){
    console.log('return')
    this.setState({
       floor : ''
    })
  }

  render(){

    const vis = (<Vis 
                      data={this.state.data} 
                      selectFloor={this.handleFlooeSelect.bind(this)} 
                      /> )

    const map = (<Map 
                      floor={this.state.floor} 
                      return={this.handleReturn.bind(this)} 
                      percent={this.state.percent}
                    /> )

  return (
    <div className="fire-app">       
      <div className='panel'>   
        <BorderBox2 >
          {  this.state.floor == ''  ? vis :   map }
        </BorderBox2>
      </div>
    </div>
  )}
}

export default Fire;
