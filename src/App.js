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

    }
  }

  handleFlooeSelect(floor){
    this.setState({ floor })
  }

  render(){
  return (
    <div className="App">

      <div className='left-panel'>
        <BorderBox8 >
          <Map floor={this.state.floor} />
        </BorderBox8>
      </div>
      
      <div className='right-panel'>
        <BorderBox1 >
          <Vis selectFloor={this.handleFlooeSelect.bind(this)} />
        </BorderBox1>
      </div>

{/*      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>*/}
      
    </div>
  )}
}

export default App;
