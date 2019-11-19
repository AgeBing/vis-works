import React from 'react';
import logo from './logo.svg';
import './App.css';
import Vis from './vis';
import Map from './map';


import { BorderBox1,BorderBox2,
        BorderBox8
    } from '@jiaminghi/data-view-react'

class App extends React.Component {
  
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
          data.push({
            'floor' : floors[i],
            'type'  : types[j],
            'percent' : Math.round(Math.random() * 20)
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
    <div className="App">   
      <div className='panel'>   
        <BorderBox2 >
          {  this.state.floor == ''  ? vis :   map }
        </BorderBox2>
      </div>
    </div>
  )}
}

export default App;
